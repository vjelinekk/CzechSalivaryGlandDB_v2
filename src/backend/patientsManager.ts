import { KaplanMeierType } from '../frontend/constants'
import {
    FilteredColumns,
    KaplanMeierData,
    KaplanMeierPatientData,
    PatientType,
} from '../frontend/types'
import {
    deleteRow,
    getAllRows,
    getRow,
    insertRow,
    updateRow,
} from './basicOperations'
import {
    FormType,
    formTypeToTableName,
    jeVeStudiiColumns,
    paroditBenignColumns,
    podcelistniColumns,
    podjazykoveColumns,
    priusniColumns,
    submandibularBenignColumns,
    TableNames,
} from './constants'
import db from './dbManager'
import { decrypt, encrypt } from './encryption'
import { deletePatientFromAllStudies } from './studieManager'
import { RowRecordType } from './types'

export const decryptPatientData = (
    patientData: PatientType[]
): PatientType[] => {
    return patientData.map((patient) => {
        const decryptedPatient: PatientType = { ...patient }

        if (patient.jmeno) {
            const [encryptedName, iv] = patient.jmeno.split(':')
            decryptedPatient.jmeno = decrypt(
                encryptedName,
                Buffer.from(iv, 'hex')
            )
        }

        if (patient.prijmeni) {
            const [encryptedSurname, iv] = patient.prijmeni.split(':')
            decryptedPatient.prijmeni = decrypt(
                encryptedSurname,
                Buffer.from(iv, 'hex')
            )
        }

        if (patient.rodne_cislo) {
            const [encryptedRC, iv] = patient.rodne_cislo.split(':')
            decryptedPatient.rodne_cislo = decrypt(
                encryptedRC,
                Buffer.from(iv, 'hex')
            )
        }

        return decryptedPatient
    })
}

export const encryptPatientData = (patientData: PatientType): PatientType => {
    const encryptedPatient: PatientType = { ...patientData }

    if (patientData.jmeno) {
        const { encrypted: encryptedName, iv } = encrypt(
            patientData.jmeno as string
        )
        encryptedPatient.jmeno = encryptedName + ':' + iv.toString('hex')
    }

    if (patientData.prijmeni) {
        const { encrypted: encryptedSurname, iv } = encrypt(
            patientData.prijmeni as string
        )
        encryptedPatient.prijmeni = encryptedSurname + ':' + iv.toString('hex')
    }

    if (patientData.rodne_cislo) {
        const { encrypted: encryptedRC, iv } = encrypt(
            patientData.rodne_cislo as string
        )
        encryptedPatient.rodne_cislo = encryptedRC + ':' + iv.toString('hex')
    }

    return encryptedPatient
}

export const insertPatient = async (
    data: RowRecordType
): Promise<number | null> => {
    const formType = data.form_type as FormType
    let result

    const patientData: PatientType = encryptPatientData(data as PatientType)

    try {
        const tableName = formTypeToTableName[formType]

        if (!tableName) {
            return null
        }

        await insertRow(tableName, patientData)
    } catch (err) {
        result = null
    }

    return result
}

export const updatePatient = async (
    data: Record<string, string | number | string[]>
): Promise<number | null> => {
    const formType = data.form_type as FormType
    const patientData: PatientType = encryptPatientData(data as PatientType)

    try {
        const tableName = formTypeToTableName[formType]

        if (!tableName) {
            return null
        }

        const result = await updateRow(
            tableName,
            data.id as number,
            patientData
        )

        return result
    } catch (err) {
        return null
    }
}

export const savePatient = async (
    data: RowRecordType
): Promise<number | null> => {
    try {
        const patient = await getPatient(
            data.id as number,
            data.form_type as FormType
        )

        if (patient) {
            return await updatePatient(data)
        } else {
            return await insertPatient(data)
        }
    } catch (err) {
        return null
    }
}

export const getAllPatients = async () => {
    let patients = []

    try {
        const podcelistni = await getAllRows(TableNames.podcelistni)
        const podjazykove = await getAllRows(TableNames.podjazykove)
        const priusni = await getAllRows(TableNames.priusni)
        const submandibularBenign = await getAllRows(
            TableNames.submandibularBenign
        )
        const parotidBenign = await getAllRows(TableNames.parotidBenign)

        patients.push(
            ...podcelistni,
            ...podjazykove,
            ...priusni,
            ...submandibularBenign,
            ...parotidBenign
        )
    } catch (err) {
        patients = null
    }

    patients = decryptPatientData(patients)

    return patients
}

export const getPatientsByType = async (
    formType: FormType
): Promise<Record<string, string | number | string[]>[] | null> => {
    let patients

    try {
        const tableName = formTypeToTableName[formType]

        patients = await getAllRows(tableName)
    } catch (err) {
        patients = null
    }

    patients = decryptPatientData(patients)

    return patients
}

export const getPatient = async (
    id: number,
    formType: FormType
): Promise<Record<string, string | number | string[]> | null> => {
    let patient

    try {
        const tableName = formTypeToTableName[formType]

        patient = await getRow(tableName, id)
    } catch (err) {
        patient = null
    }

    if (patient) {
        patient = decryptPatientData([patient])[0]
    }

    return patient
}

export const getFilteredPatients = async (
    filter: FilteredColumns,
    idStudie?: number
): Promise<PatientType[] | null> => {
    if (idStudie) {
        return getFilteredPatientsFromStudy(filter, idStudie)
    } else {
        return await getFilteredPatientsFromAllPatients(filter)
    }
}

const getFilteredPatientsFromStudy = async (
    filter: FilteredColumns,
    idStudie: number
): Promise<PatientType[]> => {
    let filteredPatients: PatientType[] = []
    const tablesToSelectFrom = getTablesToSelectFrom(filter)
    const { whereStatement, values } = getFilterWhereStatement(filter)

    const promises = tablesToSelectFrom.map((tableName) => {
        return new Promise<void>((resolveQuery, rejectQuery) => {
            const query = `SELECT ${tableName}.* FROM ${tableName} JOIN ${TableNames.jeVeStudii} ON ${tableName}.id = ${jeVeStudiiColumns.id_pacient_db.columnName} AND ${tableName}.form_type = ${jeVeStudiiColumns.typ_pacienta.columnName} WHERE ${jeVeStudiiColumns.id_studie.columnName} = ? AND (${whereStatement.length > 0 ? `(${whereStatement})` : '1'})`

            db.all(query, [idStudie, ...values], (err, rows: PatientType[]) => {
                if (err) {
                    rejectQuery(err)
                } else {
                    filteredPatients.push(...rows)
                    resolveQuery()
                }
            })
        })
    })

    try {
        await Promise.all(promises)
        filteredPatients = decryptPatientData(filteredPatients)
        return filteredPatients
    } catch (err) {
        return []
    }
}

const getFilteredPatientsFromAllPatients = async (
    filter: FilteredColumns
): Promise<PatientType[]> => {
    let filteredPatients: PatientType[] = []
    const tablesToSelectFrom = getTablesToSelectFrom(filter)
    const { whereStatement, values } = getFilterWhereStatement(filter)

    const promises = tablesToSelectFrom.map((tableName) => {
        return new Promise<void>((resolveQuery, rejectQuery) => {
            const query = `SELECT * FROM ${tableName} ${whereStatement.length > 0 ? `WHERE ${whereStatement}` : ''}`

            db.all(query, values, (err, rows: PatientType[]) => {
                if (err) {
                    rejectQuery(err)
                } else {
                    filteredPatients.push(...rows)
                    resolveQuery()
                }
            })
        })
    })

    try {
        await Promise.all(promises)
        filteredPatients = decryptPatientData(filteredPatients)
        return filteredPatients
    } catch (err) {
        return []
    }
}

const getTablesToSelectFrom = (filter: FilteredColumns): TableNames[] => {
    const tablesToSelectFrom: TableNames[] = []

    if (filter.form_type.length === 0) {
        tablesToSelectFrom.push(
            TableNames.podcelistni,
            TableNames.podjazykove,
            TableNames.priusni
        )
    } else {
        filter.form_type.forEach((formType) => {
            tablesToSelectFrom.push(formTypeToTableName[formType])
        })
    }

    return tablesToSelectFrom
}

const getFilterWhereStatement = (
    filter: FilteredColumns
): { whereStatement: string; values: string[] } => {
    let whereStatement = ''
    const values: string[] = []

    // For typ_terapie
    if (filter.typ_terapie.length > 0) {
        const typTerapieConditions = filter.typ_terapie
            .map(() => 'typ_terapie = ?')
            .join(' OR ')
        whereStatement += `(${typTerapieConditions})`
        values.push(...filter.typ_terapie)
    }

    // For histopatologie_vysledek
    if (filter.histopatologie_vysledek.length > 0) {
        const histopatologieConditions = filter.histopatologie_vysledek
            .map(() => 'histopatologie_vysledek = ?')
            .join(' OR ')
        if (whereStatement !== '') {
            whereStatement += ' OR '
        }
        whereStatement += `(${histopatologieConditions})`
        values.push(...filter.histopatologie_vysledek)
    }

    return { whereStatement, values }
}

export const getKaplanMeierData = async (
    kaplanMeierType: KaplanMeierType,
    filter: FilteredColumns
): Promise<KaplanMeierData | null> => {
    const tablesToSelectFrom = getTablesToSelectFrom(filter)

    const kaplanMeierData: KaplanMeierData = {}

    const promises = tablesToSelectFrom.flatMap((tableName) => {
        return filter.histopatologie_vysledek.map((histopatologieVysledek) => {
            return new Promise<void>((resolveQuery, rejectQuery) => {
                let query = ''
                if (kaplanMeierType === KaplanMeierType.survival) {
                    query = `SELECT ${tableName}.rok_diagnozy, ${tableName}.datum_umrti FROM ${tableName} WHERE ${tableName}.histopatologie_vysledek = ?`
                } else {
                    query = `SELECT ${tableName}.rok_diagnozy, ${tableName}.datum_prokazani_recidivy FROM ${tableName} WHERE ${tableName}.histopatologie_vysledek = ?`
                }

                db.all(
                    query,
                    [histopatologieVysledek],
                    (err, rows: PatientType[]) => {
                        if (err) {
                            rejectQuery(err)
                        } else {
                            kaplanMeierData[histopatologieVysledek] = [
                                ...(kaplanMeierData[histopatologieVysledek] ||
                                    []),
                                ...rows.map((row) => {
                                    const patientData: KaplanMeierPatientData =
                                        {
                                            start_date:
                                                row.rok_diagnozy as string,
                                            event_date:
                                                kaplanMeierType ===
                                                KaplanMeierType.survival
                                                    ? (row.datum_umrti as string)
                                                    : (row.datum_prokazani_recidivy as string),
                                        }
                                    return patientData
                                }),
                            ]
                            resolveQuery()
                        }
                    }
                )
            })
        })
    })

    try {
        await Promise.all(promises)
        return kaplanMeierData
    } catch (err) {
        return null
    }
}

export const searchPatientsByNameSurnameRC = async (
    search: string
): Promise<PatientType[] | null> => {
    const patients: PatientType[] = []

    return new Promise((resolve, reject) => {
        const queryPodcelistni = `SELECT * FROM ${TableNames.podcelistni} WHERE CONCAT(${podcelistniColumns.jmeno.columnName}, ' ', ${podcelistniColumns.prijmeni.columnName}) LIKE '%${search}%' OR CAST(${podcelistniColumns.rodne_cislo.columnName} AS TEXT) LIKE '%${search}%'`
        const queryPodjazykove = `SELECT * FROM ${TableNames.podjazykove} WHERE CONCAT(${podjazykoveColumns.jmeno.columnName}, ' ', ${podjazykoveColumns.prijmeni.columnName}) LIKE '%${search}%' OR CAST(${podjazykoveColumns.rodne_cislo.columnName} AS TEXT) LIKE '%${search}%'`
        const queryPriusni = `SELECT * FROM ${TableNames.priusni} WHERE CONCAT(${priusniColumns.jmeno.columnName}, ' ', ${priusniColumns.prijmeni.columnName}) LIKE '%${search}%' OR CAST(${priusniColumns.rodne_cislo.columnName} AS TEXT) LIKE '%${search}%'`
        const querySubmandibularBenign = `SELECT * FROM ${TableNames.submandibularBenign} WHERE CONCAT(${submandibularBenignColumns.jmeno.columnName}, ' ', ${submandibularBenignColumns.prijmeni.columnName}) LIKE '%${search}%' OR CAST(${submandibularBenignColumns.rodne_cislo.columnName} AS TEXT) LIKE '%${search}%'`
        const queryParotidBenign = `SELECT * FROM ${TableNames.parotidBenign} WHERE CONCAT(${submandibularBenignColumns.jmeno.columnName}, ' ', ${paroditBenignColumns.prijmeni.columnName}) LIKE '%${search}%' OR CAST(${paroditBenignColumns.rodne_cislo.columnName} AS TEXT) LIKE '%${search}%'`

        const promises = [
            new Promise<void>((resolveQuery, rejectQuery) => {
                db.all(queryPodcelistni, (err, rows: PatientType[]) => {
                    if (err) {
                        console.log(err)
                        rejectQuery(err)
                    } else {
                        patients.push(...rows)
                        resolveQuery()
                    }
                })
            }),
            new Promise<void>((resolveQuery, rejectQuery) => {
                db.all(queryPodjazykove, (err, rows: PatientType[]) => {
                    if (err) {
                        rejectQuery(err)
                    } else {
                        patients.push(...rows)
                        resolveQuery()
                    }
                })
            }),
            new Promise<void>((resolveQuery, rejectQuery) => {
                db.all(queryPriusni, (err, rows: PatientType[]) => {
                    if (err) {
                        rejectQuery(err)
                    } else {
                        patients.push(...rows)
                        resolveQuery()
                    }
                })
            }),
            new Promise<void>((resolveQuery, rejectQuery) => {
                db.all(querySubmandibularBenign, (err, rows: PatientType[]) => {
                    if (err) {
                        rejectQuery(err)
                    } else {
                        patients.push(...rows)
                        resolveQuery()
                    }
                })
            }),
            new Promise<void>((resolveQuery, rejectQuery) => {
                db.all(queryParotidBenign, (err, rows: PatientType[]) => {
                    if (err) {
                        rejectQuery(err)
                    } else {
                        patients.push(...rows)
                        resolveQuery()
                    }
                })
            }),
        ]

        // Wait for all queries to complete
        Promise.all(promises)
            .then(() => {
                resolve(patients)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const deletePatient = async (
    data: Record<string, string | number | string[]>
): Promise<boolean> => {
    const formType = data.form_type as FormType
    const id = data.id as number

    try {
        const tableName = formTypeToTableName[formType]

        if (!tableName) {
            return false
        }

        await deleteRow(tableName, id)
        await deletePatientFromAllStudies(id)

        return true
    } catch (err) {
        return false
    }
}
