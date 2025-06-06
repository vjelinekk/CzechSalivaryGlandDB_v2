import { Study } from '../frontend/types'
import {
    deleteRow,
    deleteRowsBy,
    getAllRows,
    getRow,
    getRowsBy,
    insertRow,
    updateRow,
} from './basicOperations'
import {
    FormType,
    isInStudyColumns,
    studyColumns,
    TableNames,
} from './constants'
import db from './dbManager'
import { decryptPatientData } from './patientsManager'
import { RowRecordType } from './types'

const tableName = TableNames.studies

export const insertStudy = async (
    data: RowRecordType
): Promise<number | null> => {
    let result
    try {
        result = await insertRow(tableName, data)
    } catch (err) {
        result = null
    }

    return result
}

export const updateStudy = async (
    data: RowRecordType
): Promise<number | null> => {
    try {
        return await updateRow(tableName, data.id as number, data)
    } catch (err) {
        return null
    }
}

export const saveStudy = async (
    data: RowRecordType
): Promise<number | null> => {
    const study = await getRow(tableName, data.id as number)
    if (study) {
        return await updateStudy(data)
    } else {
        return await insertStudy(data)
    }
}

export const insertPatientToStudy = async (
    data: RowRecordType
): Promise<boolean> => {
    try {
        await insertRow(TableNames.isInStudy, data)
        return true
    } catch (err) {
        return false
    }
}

export const updatePatientsStudies = async (
    patientId: number,
    patientType: FormType,
    studies: Study[]
): Promise<boolean> => {
    try {
        await deleteRowsBy(
            TableNames.isInStudy,
            [
                isInStudyColumns.id_pacient_db.columnName,
                isInStudyColumns.typ_pacienta.columnName,
            ],
            [patientId, patientType]
        )
        await Promise.all(
            studies.map((study) => {
                return insertPatientToStudy({
                    id_studie: study.id,
                    id_pacient_db: patientId,
                    typ_pacienta: patientType,
                })
            })
        )
        return true
    } catch (err) {
        return false
    }
}

export const getPatientsInStudy = async (
    idStudie: number
): Promise<RowRecordType[]> => {
    const patientsInStudy = await getRowsBy(
        TableNames.isInStudy,
        [isInStudyColumns.id_studie.columnName],
        [idStudie]
    )

    let patients = await Promise.all(
        patientsInStudy.map(
            async (patientInStudy: {
                id_pacient_db: number
                typ_pacienta: number
            }) => {
                if (patientInStudy.typ_pacienta === FormType.submandibular) {
                    const patient = await getRow(
                        TableNames.submandibularMalignant,
                        patientInStudy.id_pacient_db
                    )
                    return patient
                } else if (
                    patientInStudy.typ_pacienta === FormType.sublingual
                ) {
                    const patient = await getRow(
                        TableNames.sublingualMalignant,
                        patientInStudy.id_pacient_db
                    )
                    return patient
                } else if (patientInStudy.typ_pacienta === FormType.parotid) {
                    const patient = await getRow(
                        TableNames.parotidMalignant,
                        patientInStudy.id_pacient_db
                    )
                    return patient
                } else if (
                    patientInStudy.typ_pacienta === FormType.submandibularBenign
                ) {
                    const patient = await getRow(
                        TableNames.submandibularBenign,
                        patientInStudy.id_pacient_db
                    )
                    return patient
                } else if (
                    patientInStudy.typ_pacienta === FormType.parotidBenign
                ) {
                    const patient = await getRow(
                        TableNames.parotidBenign,
                        patientInStudy.id_pacient_db
                    )
                    return patient
                }
            }
        )
    )

    patients = decryptPatientData(patients)

    return patients
}

export const getStudies = async (): Promise<RowRecordType[]> => {
    try {
        return await getAllRows(TableNames.studies)
    } catch (err) {
        return []
    }
}

export const getStudiesByFormType = async (
    formType: number
): Promise<RowRecordType[]> => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM ${TableNames.studies} WHERE ${studyColumns.typ_studie.columnName} = ? OR ${studyColumns.typ_studie.columnName} = ?`,
            [formType, 4],
            (err, rows) => {
                if (err) {
                    reject([])
                }
                resolve(rows as RowRecordType[])
            }
        )
    })
}

export const getStudiesByPatientId = async (
    patientId: number,
    patientType: FormType
): Promise<RowRecordType[]> => {
    const studies = await getRowsBy(
        TableNames.isInStudy,
        [
            isInStudyColumns.id_pacient_db.columnName,
            isInStudyColumns.typ_pacienta.columnName,
        ],
        [patientId, patientType]
    )

    return await Promise.all(
        studies.map(async (study: { id_studie: number }) => {
            return await getRow(TableNames.studies, study.id_studie)
        })
    )
}

export const deletePatientFromAllStudies = async (
    patientId: number
): Promise<boolean> => {
    try {
        await deleteRowsBy(
            TableNames.isInStudy,
            [isInStudyColumns.id_pacient_db.columnName],
            [patientId]
        )
        return true
    } catch (err) {
        return false
    }
}

export const deletePatientFromStudy = async (
    studyId: number,
    patientId: number,
    patientType: FormType
): Promise<boolean> => {
    try {
        await deleteRowsBy(
            TableNames.isInStudy,
            [
                isInStudyColumns.id_studie.columnName,
                isInStudyColumns.id_pacient_db.columnName,
                isInStudyColumns.typ_pacienta.columnName,
            ],
            [studyId, patientId, patientType]
        )
        return true
    } catch (err) {
        return false
    }
}

export const deleteStudy = async (data: RowRecordType): Promise<boolean> => {
    const id = data[studyColumns.id.columnName] as number
    try {
        await deleteRow(tableName, id)
        await deleteRowsBy(
            TableNames.isInStudy,
            [isInStudyColumns.id_studie.columnName],
            [id]
        )
        return true
    } catch (err) {
        return false
    }
}
