import { PatientType } from '../frontend/types'
import {
    deleteRow,
    getAllRows,
    getRow,
    insertRow,
    updateRow,
} from './basicOperations'
import {
    FormType,
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
