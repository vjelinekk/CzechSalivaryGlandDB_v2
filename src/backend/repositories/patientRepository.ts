import {
    deleteRow,
    getAllRows,
    getRow,
    insertRow,
    updateRow,
} from '../basicOperations'
import {
    formTypeToTableName,
    isInStudyColumns,
    parotidBenignColumns,
    submandibularMalignantColumns,
    sublingualMalignantColumns,
    parotidMalignantColumns,
    submandibularBenignColumns,
    TableNames,
    FormType,
} from '../constants'
import db from '../dbManager'
import { decrypt, encrypt } from '../encryption'
import { deletePatientFromAllStudies } from './studyRepository'
import {
    ParotidBenignColumns,
    ParotidMalignantColumns,
    SublingualMalignantColumns,
    SubmandibularBenignColumns,
    SubmandibularMalignantColumns,
} from '../types'
import { InferenceChiSquareCategories } from '../enums'
import { PatientMapper } from '../mappers/PatientMapper'
import { getActiveEdition, savePatientStaging } from './tnmRepository'
import { PatientDto } from '../../ipc/dtos/PatientDto'
import { TumorTypeEnum } from '../../ipc/dtos/enums/TumorTypeEnum'
import { FilteredColumnsDto } from '../../ipc/dtos/FilteredColumnsDto'
import { KaplanMeierPatientDataDto } from '../../ipc/dtos/KaplanMeierPatientDataDto'
import { KaplanMeierDataDto } from '../../ipc/dtos/KaplanMeierDataDto'
import { KaplanMeierTypeEnum } from '../../ipc/dtos/enums/KaplanMeierTypeEnum'
import { PlannedPatientsMapDto } from '../../ipc/dtos/PlannedPatientsMapDto'
import { ITTestGroupsDto } from '../../ipc/dtos/ITTestGroupsDto'
import { NonParametricTestDataDto } from '../../ipc/dtos/NonParametricTestDataDto'

export const decryptPatientData = (patientData: PatientDto[]): PatientDto[] => {
    return patientData.map((patient) => {
        const decryptedPatient: PatientDto = { ...patient }

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

export const encryptPatientData = (patientData: PatientDto): PatientDto => {
    const encryptedPatient: PatientDto = { ...patientData }

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

// TNM ID fields that should be filtered out when saving to old tables
const TNM_ID_FIELDS = [
    't_klasifikace_klinicka_id',
    'n_klasifikace_klinicka_id',
    'm_klasifikace_klinicka_id',
    'tnm_klasifikace_klinicka_id',
    't_klasifikace_patologicka_id',
    'n_klasifikace_patologicka_id',
    'm_klasifikace_patologicka_id',
    'tnm_klasifikace_patologicka_id',
]

// Filter out TNM ID fields that don't exist in old database tables
const filterTnmIdFields = (data: PatientDto): PatientDto => {
    const filtered = { ...data }
    for (const field of TNM_ID_FIELDS) {
        delete filtered[field]
    }
    return filtered
}

export const insertPatient = async (
    data: PatientDto
): Promise<number | null> => {
    const formType = data.form_type as FormType
    let result

    // Filter out TNM ID fields and encrypt
    const filteredData = filterTnmIdFields(data)
    const patientData: PatientDto = encryptPatientData(filteredData)

    try {
        const tableName = formTypeToTableName[formType]

        if (!tableName) {
            return null
        }

        result = await insertRow(tableName, patientData)
    } catch (err) {
        result = null
    }

    return result
}

export const updatePatient = async (
    data: PatientDto
): Promise<number | null> => {
    const formType = data.form_type as FormType
    // Filter out TNM ID fields and encrypt
    const filteredData = filterTnmIdFields(data)
    const patientData: PatientDto = encryptPatientData(filteredData)

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

export const savePatient = async (data: PatientDto): Promise<number | null> => {
    // Get active TNM edition for staging
    const activeEdition = await getActiveEdition()
    const editionId = activeEdition?.id ?? 1

    const mappedPatient = PatientMapper.toPersistence(data, editionId)
    console.log(data)
    console.log(mappedPatient)

    try {
        const patient = await getPatient(
            data.id as number,
            data.form_type as FormType
        )

        let patientId: number | null
        if (patient) {
            patientId = await updatePatient(data)
        } else {
            patientId = await insertPatient(data)
        }

        // Save patient staging if applicable (malignant tumors only)
        // Note: This will only work once patients are migrated to the new 'patient' table
        // For now, we catch and log errors since old schema patients can't be referenced
        if (patientId && mappedPatient.patientStaging) {
            try {
                const stagingWithPatientId = {
                    ...mappedPatient.patientStaging,
                    id_patient: patientId,
                }
                await savePatientStaging(stagingWithPatientId)
            } catch (stagingError) {
                console.warn(
                    'Could not save patient staging (patient not in new schema yet):',
                    stagingError
                )
            }
        }

        return patientId
    } catch (err) {
        console.error('Error saving patient:', err)
        return null
    }
}

export const getAllPatients = async () => {
    let patients = []

    try {
        const submandibularMalignant = await getAllRows(
            TableNames.submandibularMalignant
        )
        const sublingualMalignant = await getAllRows(
            TableNames.sublingualMalignant
        )
        const parotidMalignant = await getAllRows(TableNames.parotidMalignant)
        const submandibularBenign = await getAllRows(
            TableNames.submandibularBenign
        )
        const parotidBenign = await getAllRows(TableNames.parotidBenign)

        patients.push(
            ...submandibularMalignant,
            ...sublingualMalignant,
            ...parotidMalignant,
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
): Promise<PatientDto[] | null> => {
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
    filter: FilteredColumnsDto,
    idStudie?: number
): Promise<PatientDto[] | null> => {
    if (idStudie) {
        return getFilteredPatientsFromStudy(filter, idStudie)
    } else {
        return await getFilteredPatientsFromAllPatients(filter)
    }
}

const getFilteredPatientsFromStudy = async (
    filter: FilteredColumnsDto,
    idStudie: number
): Promise<PatientDto[]> => {
    let filteredPatients: PatientDto[] = []
    const tablesToSelectFrom = getTablesToSelectFrom(filter)
    const { whereStatement, values } = getFilterWhereStatement(filter)

    const promises = tablesToSelectFrom.map((tableName) => {
        return new Promise<void>((resolveQuery, rejectQuery) => {
            const query = `SELECT ${tableName}.* FROM ${tableName} JOIN ${TableNames.isInStudy} ON ${tableName}.id = ${isInStudyColumns.id_pacient_db.columnName} AND ${tableName}.form_type = ${isInStudyColumns.typ_pacienta.columnName} WHERE ${isInStudyColumns.id_studie.columnName} = ? AND (${whereStatement.length > 0 ? `(${whereStatement})` : '1'})`

            db.all(query, [idStudie, ...values], (err, rows: PatientDto[]) => {
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
    filter: FilteredColumnsDto
): Promise<PatientDto[]> => {
    let filteredPatients: PatientDto[] = []
    const tablesToSelectFrom = getTablesToSelectFrom(filter)
    const { whereStatement, values } = getFilterWhereStatement(filter)

    const promises = tablesToSelectFrom.map((tableName) => {
        return new Promise<void>((resolveQuery, rejectQuery) => {
            const query = `SELECT * FROM ${tableName} ${whereStatement.length > 0 ? `WHERE ${whereStatement}` : ''}`

            db.all(query, values, (err, rows: PatientDto[]) => {
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

const getTablesToSelectFrom = (filter: FilteredColumnsDto): TableNames[] => {
    const tablesToSelectFrom: TableNames[] = []

    if (
        filter.typ_nadoru === TumorTypeEnum.MALIGNANT &&
        filter.form_type.length === 0
    ) {
        tablesToSelectFrom.push(
            TableNames.submandibularMalignant,
            TableNames.sublingualMalignant,
            TableNames.parotidMalignant
        )
    }

    if (
        filter.typ_nadoru === TumorTypeEnum.MALIGNANT &&
        filter.form_type.length > 0
    ) {
        filter.form_type.forEach((formType) => {
            tablesToSelectFrom.push(formTypeToTableName[formType])
        })
    }

    if (
        filter.typ_nadoru === TumorTypeEnum.BENIGN &&
        filter.form_type.length === 0
    ) {
        tablesToSelectFrom.push(
            TableNames.submandibularBenign,
            TableNames.parotidBenign
        )
    }

    if (
        filter.typ_nadoru === TumorTypeEnum.BENIGN &&
        filter.form_type.length > 0
    ) {
        filter.form_type.forEach((formType) => {
            tablesToSelectFrom.push(formTypeToTableName[formType])
        })
    }

    if (filter.typ_nadoru === null) {
        tablesToSelectFrom.push(
            TableNames.submandibularMalignant,
            TableNames.sublingualMalignant,
            TableNames.parotidMalignant,
            TableNames.submandibularBenign,
            TableNames.parotidBenign
        )
    }

    return tablesToSelectFrom
}

const getFilterWhereStatement = (
    filter: FilteredColumnsDto
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
        const histopathologyConditions = filter.histopatologie_vysledek
            .map(() => 'histopatologie_vysledek = ?')
            .join(' OR ')
        if (whereStatement !== '') {
            whereStatement += ' AND '
        }
        whereStatement += `(${histopathologyConditions})`
        values.push(...filter.histopatologie_vysledek)
    }

    // For perzistence
    if (filter.perzistence) {
        if (whereStatement !== '') {
            whereStatement += ' AND '
        }
        whereStatement += `perzistence = ?`
        values.push(filter.perzistence)
    }

    // For recidiva
    if (filter.recidiva) {
        if (whereStatement !== '') {
            whereStatement += ' AND '
        }
        whereStatement += `recidiva = ?`
        values.push(filter.recidiva)
    }

    // For stav
    if (filter.stav) {
        if (whereStatement !== '') {
            whereStatement += ' AND '
        }
        whereStatement += `stav = ?`
        values.push(filter.stav)
    }

    // For pohlavi
    if (filter.pohlavi) {
        if (whereStatement !== '') {
            whereStatement += ' AND '
        }
        whereStatement += `pohlavi = ?`
        values.push(filter.pohlavi)
    }

    return { whereStatement, values }
}

export const getKaplanMeierData = async (
    kaplanMeierType: KaplanMeierTypeEnum,
    filter: FilteredColumnsDto
): Promise<KaplanMeierDataDto | null> => {
    const tablesToSelectFrom = getTablesToSelectFrom(filter)

    const kaplanMeierData: KaplanMeierDataDto = {}

    const promises = tablesToSelectFrom.flatMap((tableName) => {
        return filter.histopatologie_vysledek.map((histopatologieVysledek) => {
            return new Promise<void>((resolveQuery, rejectQuery) => {
                let query = ''
                if (kaplanMeierType === KaplanMeierTypeEnum.survival) {
                    query = `SELECT ${tableName}.rok_diagnozy, ${tableName}.datum_umrti, ${tableName}.posledni_kontrola FROM ${tableName} WHERE ${tableName}.histopatologie_vysledek = ?`
                } else {
                    query = `SELECT ${tableName}.rok_diagnozy, ${tableName}.datum_prokazani_recidivy, ${tableName}.posledni_kontrola  FROM ${tableName} WHERE ${tableName}.histopatologie_vysledek = ?`
                }

                db.all(
                    query,
                    [histopatologieVysledek],
                    (err, rows: PatientDto[]) => {
                        if (err) {
                            rejectQuery(err)
                        } else {
                            kaplanMeierData[histopatologieVysledek] = [
                                ...(kaplanMeierData[histopatologieVysledek] ||
                                    []),
                                ...rows
                                    .filter((row) => {
                                        return row.rok_diagnozy !== null
                                    })
                                    .map((row) => {
                                        const patientData: KaplanMeierPatientDataDto =
                                            {
                                                start_date: new Date(
                                                    row.rok_diagnozy as string
                                                ),
                                                event_date: getEventDate(
                                                    row,
                                                    kaplanMeierType
                                                ),
                                                last_follow_up_date:
                                                    getLastFollowUpDate(row),
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

const getEventDate = (
    row: PatientDto,
    kaplanMeierType: KaplanMeierTypeEnum
): Date | null => {
    if (kaplanMeierType === KaplanMeierTypeEnum.survival) {
        if (row.datum_umrti && row.datum_umrti !== '') {
            return new Date(row.datum_umrti as string)
        }

        return null
    } else {
        if (
            row.datum_prokazani_recidivy &&
            row.datum_prokazani_recidivy !== ''
        ) {
            return new Date(row.datum_prokazani_recidivy as string)
        }

        return null
    }
}

const getLastFollowUpDate = (row: PatientDto): Date | null => {
    console.log(row)
    if (row.posledni_kontrola && row.posledni_kontrola !== '') {
        return new Date(row.posledni_kontrola as string)
    }

    if (row.rok_diagnozy && row.rok_diagnozy !== '') {
        return new Date(row.rok_diagnozy as string)
    }

    return null
}

export const searchPatientsByNameSurnameRC = async (
    search: string
): Promise<PatientDto[] | null> => {
    const patients: PatientDto[] = []

    return new Promise((resolve, reject) => {
        const querySubmandibularMalignant = `SELECT * FROM ${TableNames.submandibularMalignant} WHERE CONCAT(${submandibularMalignantColumns.jmeno.columnName}, ' ', ${submandibularMalignantColumns.prijmeni.columnName}) LIKE '%${search}%' OR CAST(${submandibularMalignantColumns.rodne_cislo.columnName} AS TEXT) LIKE '%${search}%'`
        const querySublingualMalignant = `SELECT * FROM ${TableNames.sublingualMalignant} WHERE CONCAT(${sublingualMalignantColumns.jmeno.columnName}, ' ', ${sublingualMalignantColumns.prijmeni.columnName}) LIKE '%${search}%' OR CAST(${sublingualMalignantColumns.rodne_cislo.columnName} AS TEXT) LIKE '%${search}%'`
        const queryParotidMalignant = `SELECT * FROM ${TableNames.parotidMalignant} WHERE CONCAT(${parotidMalignantColumns.jmeno.columnName}, ' ', ${parotidMalignantColumns.prijmeni.columnName}) LIKE '%${search}%' OR CAST(${parotidMalignantColumns.rodne_cislo.columnName} AS TEXT) LIKE '%${search}%'`
        const querySubmandibularBenign = `SELECT * FROM ${TableNames.submandibularBenign} WHERE CONCAT(${submandibularBenignColumns.jmeno.columnName}, ' ', ${submandibularBenignColumns.prijmeni.columnName}) LIKE '%${search}%' OR CAST(${submandibularBenignColumns.rodne_cislo.columnName} AS TEXT) LIKE '%${search}%'`
        const queryParotidBenign = `SELECT * FROM ${TableNames.parotidBenign} WHERE CONCAT(${submandibularBenignColumns.jmeno.columnName}, ' ', ${parotidBenignColumns.prijmeni.columnName}) LIKE '%${search}%' OR CAST(${parotidBenignColumns.rodne_cislo.columnName} AS TEXT) LIKE '%${search}%'`

        const promises = [
            new Promise<void>((resolveQuery, rejectQuery) => {
                db.all(
                    querySubmandibularMalignant,
                    (err, rows: PatientDto[]) => {
                        if (err) {
                            console.log(err)
                            rejectQuery(err)
                        } else {
                            patients.push(...rows)
                            resolveQuery()
                        }
                    }
                )
            }),
            new Promise<void>((resolveQuery, rejectQuery) => {
                db.all(querySublingualMalignant, (err, rows: PatientDto[]) => {
                    if (err) {
                        rejectQuery(err)
                    } else {
                        patients.push(...rows)
                        resolveQuery()
                    }
                })
            }),
            new Promise<void>((resolveQuery, rejectQuery) => {
                db.all(queryParotidMalignant, (err, rows: PatientDto[]) => {
                    if (err) {
                        rejectQuery(err)
                    } else {
                        patients.push(...rows)
                        resolveQuery()
                    }
                })
            }),
            new Promise<void>((resolveQuery, rejectQuery) => {
                db.all(querySubmandibularBenign, (err, rows: PatientDto[]) => {
                    if (err) {
                        rejectQuery(err)
                    } else {
                        patients.push(...rows)
                        resolveQuery()
                    }
                })
            }),
            new Promise<void>((resolveQuery, rejectQuery) => {
                db.all(queryParotidBenign, (err, rows: PatientDto[]) => {
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

export const deletePatient = async (data: PatientDto): Promise<boolean> => {
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

export const getPlannedPatientsBetweenDates = async (
    startDate: Date,
    endDate: Date
): Promise<PlannedPatientsMapDto> => {
    const createPlannedPatientsQuery = (
        tableName: TableNames,
        columns:
            | SubmandibularMalignantColumns
            | SubmandibularBenignColumns
            | SublingualMalignantColumns
            | ParotidMalignantColumns
            | ParotidBenignColumns
    ) => {
        return `
        SELECT *
        FROM ${tableName} 
        WHERE ${columns.planovana_kontrola.columnName} BETWEEN ? AND ?
        `
    }

    const tableColumnsMap = {
        [TableNames.submandibularMalignant]: submandibularMalignantColumns,
        [TableNames.sublingualMalignant]: sublingualMalignantColumns,
        [TableNames.parotidMalignant]: parotidMalignantColumns,
        [TableNames.submandibularBenign]: submandibularBenignColumns,
        [TableNames.parotidBenign]: parotidBenignColumns,
    }

    // Format the date to YYYY-MM-DD
    const startDateFormatted = startDate.toISOString().split('T')[0]
    const endDateFormatted = endDate.toISOString().split('T')[0]

    const queries = Object.entries(tableColumnsMap).map(
        ([tableName, columns]) => ({
            query: createPlannedPatientsQuery(tableName as TableNames, columns),
            params: [startDateFormatted, endDateFormatted],
        })
    )

    const results = await Promise.all(
        queries.map(
            ({ query, params }) =>
                new Promise((resolve, reject) => {
                    db.all(query, params, (err, rows) => {
                        if (err) {
                            reject(err)
                            console.log(err)
                        } else {
                            resolve(rows)
                        }
                    })
                })
        )
    )

    const plannedPatients: PatientDto[] = results.flat() as PatientDto[]
    const decryptedPatients = decryptPatientData(plannedPatients)

    // go over all patients and create create an map where key is the date and values are the patients
    const plannedPatientsMap: PlannedPatientsMapDto = {}
    decryptedPatients.forEach((patient) => {
        const plannedCheckDate = patient.planovana_kontrola as string

        if (!plannedPatientsMap[plannedCheckDate]) {
            plannedPatientsMap[plannedCheckDate] = []
        }

        plannedPatientsMap[plannedCheckDate].push(patient)
    })

    return plannedPatientsMap
}

export const getChiSquareContingencyTable = async (
    rows: number,
    columns: number,
    rowSelectedCategories: Record<
        number,
        Record<InferenceChiSquareCategories, string[]>
    >,
    columnSelectedCategories: Record<
        number,
        Record<InferenceChiSquareCategories, string[]>
    >
): Promise<number[][]> => {
    const contingencyTable = Array.from({ length: rows }, () =>
        Array(columns).fill(0)
    )

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const rowData = rowSelectedCategories[i]
            const columnData = columnSelectedCategories[j]
            if (rowData && columnData) {
                const rowDataGroupedByKeys = groupByKey(rowData)
                const columnDataGroupedByKeys = groupByKey(columnData)

                const rowKeys: InferenceChiSquareCategories[] =
                    rowDataGroupedByKeys.map(
                        (item) => item.key as InferenceChiSquareCategories
                    )
                const columnKeys: InferenceChiSquareCategories[] =
                    columnDataGroupedByKeys.map(
                        (item) => item.key as InferenceChiSquareCategories
                    )

                const { queries, valuesForWhere } = generateChiSquareQuery(
                    rowKeys,
                    columnKeys,
                    rowDataGroupedByKeys,
                    columnDataGroupedByKeys
                )

                const results = await Promise.all(
                    queries.map((query) => {
                        return new Promise((resolve, reject) => {
                            db.all(query, valuesForWhere, (err, rows) => {
                                if (err) {
                                    console.log(err)
                                    console.log(rowSelectedCategories)
                                    console.log(columnSelectedCategories)
                                    reject(err)
                                } else {
                                    resolve(rows)
                                }
                            })
                        })
                    })
                )

                const totalCount = results.reduce(
                    (acc: number, row: { count: number }[]) => {
                        return acc + row[0].count
                    },
                    0
                )

                contingencyTable[i][j] = totalCount
            }
        }
    }

    return contingencyTable
}

const generateChiSquareQuery = (
    rowKeys: InferenceChiSquareCategories[],
    columnKeys: InferenceChiSquareCategories[],
    rowDataGroupedByKeys: { key: string; values: string[] }[],
    columnDataGroupedByKeys: { key: string; values: string[] }[]
) => {
    const valuesForWhere = [
        ...rowDataGroupedByKeys.flatMap((item) => item.values),
        ...columnDataGroupedByKeys.flatMap((item) => item.values),
    ]

    const rowConditions = rowKeys.map((key, index) => {
        const columnName = mapChiSquareKeysToDbColumns(key)
        const values = rowDataGroupedByKeys[index].values
        return `${columnName} IN (${values.map(() => '?').join(', ')})`
    })

    const columnConditions = columnKeys.map((key, index) => {
        const columnName = mapChiSquareKeysToDbColumns(key)
        const values = columnDataGroupedByKeys[index].values
        return `${columnName} IN (${values.map(() => '?').join(', ')})`
    })

    const querySubmandibular = `
        SELECT COUNT(*) as count
        FROM ${TableNames.submandibularMalignant}
        WHERE ${rowConditions.join(' AND ')} AND ${columnConditions.join(' AND ')}
    `
    const querySublingual = `
        SELECT COUNT(*) as count
        FROM ${TableNames.sublingualMalignant}
        WHERE ${rowConditions.join(' AND ')} AND ${columnConditions.join(' AND ')}
    `

    const queryParotid = `
        SELECT COUNT(*) as count
        FROM ${TableNames.parotidMalignant}
        WHERE ${rowConditions.join(' AND ')} AND ${columnConditions.join(' AND ')}
    `

    const queries = [querySubmandibular, querySublingual, queryParotid]

    return { queries, valuesForWhere }
}

const mapChiSquareKeysToDbColumns = (key: InferenceChiSquareCategories) => {
    const dbColumns: Record<InferenceChiSquareCategories, string> = {
        [InferenceChiSquareCategories.histologicalTypes]:
            submandibularMalignantColumns.histopatologie_vysledek.columnName,
        [InferenceChiSquareCategories.tClassification]:
            submandibularMalignantColumns.t_klasifikace_klinicka.columnName,
        [InferenceChiSquareCategories.nClassification]:
            submandibularMalignantColumns.n_klasifikace_klinicka.columnName,
        [InferenceChiSquareCategories.mClassification]:
            submandibularMalignantColumns.m_klasifikace_klinicka.columnName,
        [InferenceChiSquareCategories.persistence]:
            submandibularMalignantColumns.perzistence.columnName,
        [InferenceChiSquareCategories.recurrence]:
            submandibularMalignantColumns.recidiva.columnName,
        [InferenceChiSquareCategories.state]:
            submandibularMalignantColumns.stav.columnName,
    }

    return dbColumns[key]
}

const groupByKey = (data: Record<string, string[]>) => {
    const grouped: Record<string, string[]> = {}

    for (const [key, arr] of Object.entries(data)) {
        const filtered = arr.filter((str) => str.length > 0)
        if (filtered.length > 0) {
            grouped[key] = filtered
        }
    }

    return Object.entries(grouped).map(([key, values]) => ({
        key,
        values,
    }))
}

export const getTTestData = async (
    groups: ITTestGroupsDto
): Promise<NonParametricTestDataDto> => {
    const groupOne = groups.first
    const groupTwo = groups.second

    const { queries: queriesOne, valuesForWhere: valuesOne } =
        getTTestQueries(groupOne)
    const { queries: queriesTwo, valuesForWhere: valuesTwo } =
        getTTestQueries(groupTwo)

    const resultsQueryOne = await Promise.all(
        queriesOne.map((query) => {
            return new Promise((resolve, reject) => {
                db.all(query, valuesOne, (err, rows) => {
                    if (err) {
                        console.log(err)
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                })
            })
        })
    )

    const resultsQueryTwo = await Promise.all(
        queriesTwo.map((query) => {
            return new Promise((resolve, reject) => {
                db.all(query, valuesTwo, (err, rows) => {
                    if (err) {
                        console.log(err)
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                })
            })
        })
    )

    const groupOneData = resultsQueryOne.flat()
    const groupTwoData = resultsQueryTwo.flat()

    const tTestData: NonParametricTestDataDto = {
        group1: groupOneData as PatientDto[],
        group2: groupTwoData as PatientDto[],
    }

    return tTestData
}

const getTTestQueries = (group: {
    histologicalTypes: string[]
    tClassification: string[]
    nClassification: string[]
    mClassification: string[]
    persistence: string[]
    recurrence: string[]
    state: string[]
}): {
    valuesForWhere: string[]
    queries: string[]
} => {
    const keys = Object.keys(group)
    const valuesForWhere = Object.values(group).flat()

    const conditions = keys
        .filter((key) => group[key as keyof typeof group].length > 0)
        .map((key) => {
            const columnName = mapChiSquareKeysToDbColumns(
                key as InferenceChiSquareCategories
            )
            const values = group[key as keyof typeof group]
            return `${columnName} IN (${values.map(() => '?').join(', ')})`
        })

    const submandibularQuery = `
        SELECT * FROM ${TableNames.submandibularMalignant}
        WHERE ${conditions.join(' AND ')}
    `

    const sublingualQuery = `
        SELECT * FROM ${TableNames.sublingualMalignant}
        WHERE ${conditions.join(' AND ')}
    `

    const parotidQuery = `
        SELECT * FROM ${TableNames.parotidMalignant}
        WHERE ${conditions.join(' AND ')}
    `

    return {
        valuesForWhere,
        queries: [submandibularQuery, sublingualQuery, parotidQuery],
    }
}
