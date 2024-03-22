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
    podcelistniColumns,
    podjazykoveColumns,
    priusniColumns,
    TableNames,
} from './constants'
import db from './dbManager'
import { deletePatientFromAllStudies } from './studieManager'
import { RowRecordType } from './types'

export const insertPatient = async (
    data: RowRecordType
): Promise<number | null> => {
    const formType = data.form_type as FormType
    let result

    try {
        if (formType === FormType.podcelistni) {
            result = await insertRow(TableNames.podcelistni, data)
        } else if (formType === FormType.podjazykove) {
            result = await insertRow(TableNames.podjazykove, data)
        } else if (formType === FormType.priusni) {
            result = await insertRow(TableNames.priusni, data)
        }
    } catch (err) {
        result = null
    }

    return result
}

export const updatePatient = async (
    data: Record<string, string | number | string[]>
): Promise<number | null> => {
    const formType = data.form_type

    try {
        let result
        if (formType === FormType.podcelistni) {
            result = await updateRow(
                TableNames.podcelistni,
                data.id as number,
                data
            )
        } else if (formType === FormType.podjazykove) {
            result = await updateRow(
                TableNames.podjazykove,
                data.id as number,
                data
            )
        } else if (formType === FormType.priusni) {
            result = await updateRow(
                TableNames.priusni,
                data.id as number,
                data
            )
        }

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

        patients.push(...podcelistni, ...podjazykove, ...priusni)
    } catch (err) {
        patients = null
    }

    return patients
}

export const getPatientsByType = async (
    formType: FormType
): Promise<Record<string, string | number | string[]>[] | null> => {
    let patients

    try {
        if (formType === FormType.podcelistni) {
            patients = await getAllRows(TableNames.podcelistni)
        } else if (formType === FormType.podjazykove) {
            patients = await getAllRows(TableNames.podjazykove)
        } else if (formType === FormType.priusni) {
            patients = await getAllRows(TableNames.priusni)
        }
    } catch (err) {
        patients = null
    }

    return patients
}

export const getPatient = async (
    id: number,
    formType: FormType
): Promise<Record<string, string | number | string[]> | null> => {
    let patient

    try {
        if (formType === FormType.podcelistni) {
            patient = await getRow(TableNames.podcelistni, id)
        } else if (formType === FormType.podjazykove) {
            patient = await getRow(TableNames.podjazykove, id)
        } else if (formType === FormType.priusni) {
            patient = await getRow(TableNames.priusni, id)
        }
    } catch (err) {
        patient = null
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
    const filteredPatients: PatientType[] = []
    const tablesToSelectFrom = getTablesToSelectFrom(filter)
    const { whereStatement, values } = getFilterWhereStatement(filter)

    const promises = tablesToSelectFrom.map((tableName) => {
        return new Promise<void>((resolveQuery, rejectQuery) => {
            const query = `SELECT ${tableName}.* FROM ${tableName} JOIN ${TableNames.jeVeStudii} ON ${tableName}.id = ${jeVeStudiiColumns.id_pacient_db.columnName} WHERE ${jeVeStudiiColumns.id_studie.columnName} = ? AND (${whereStatement.length > 0 ? `(${whereStatement})` : '1'})`

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
        return filteredPatients
    } catch (err) {
        return []
    }
}

const getFilteredPatientsFromAllPatients = async (
    filter: FilteredColumns
): Promise<PatientType[]> => {
    const filteredPatients: PatientType[] = []
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
    const formType = data.form_type
    const id = data.id as number

    try {
        if (formType === FormType.podcelistni) {
            await deleteRow(TableNames.podcelistni, id)
            await deletePatientFromAllStudies(id)
        } else if (formType === FormType.podjazykove) {
            await deleteRow(TableNames.podjazykove, id)
            await deletePatientFromAllStudies(id)
        } else if (formType === FormType.priusni) {
            await deleteRow(TableNames.priusni, id)
            await deletePatientFromAllStudies(id)
        }

        return true
    } catch (err) {
        return false
    }
}
