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
    jeVeStudiiColumns,
    studieColumns,
    TableNames,
} from './constants'
import { RowRecordType } from './types'

const tableName = TableNames.studie

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
        await insertRow(TableNames.jeVeStudii, data)
        return true
    } catch (err) {
        return false
    }
}

export const getPatientsInStudy = async (
    idStudie: number
): Promise<RowRecordType[]> => {
    const patientsInStudy = await getRowsBy(
        TableNames.jeVeStudii,
        'id_studie',
        idStudie
    )

    const patients = await Promise.all(
        patientsInStudy.map(
            async (patientInStudy: {
                id_pacient_db: number
                typ_pacienta: number
            }) => {
                if (patientInStudy.typ_pacienta === FormType.podcelistni) {
                    const patient = await getRow(
                        TableNames.podcelistni,
                        patientInStudy.id_pacient_db
                    )
                    return patient
                } else if (
                    patientInStudy.typ_pacienta === FormType.podjazykove
                ) {
                    const patient = await getRow(
                        TableNames.podjazykove,
                        patientInStudy.id_pacient_db
                    )
                    return patient
                } else if (patientInStudy.typ_pacienta === FormType.priusni) {
                    const patient = await getRow(
                        TableNames.priusni,
                        patientInStudy.id_pacient_db
                    )
                    return patient
                }
            }
        )
    )

    return patients
}

export const getStudies = async (): Promise<RowRecordType[]> => {
    try {
        return await getAllRows(TableNames.studie)
    } catch (err) {
        return []
    }
}

export const deletePatientFromAllStudies = async (
    patientId: number
): Promise<boolean> => {
    try {
        await deleteRowsBy(
            TableNames.jeVeStudii,
            [jeVeStudiiColumns.id_pacient_db.columnName],
            [patientId]
        )
        return true
    } catch (err) {
        return false
    }
}

export const deletePatientFromStudy = async (
    studyId: number,
    patientId: number
): Promise<boolean> => {
    try {
        await deleteRowsBy(
            TableNames.jeVeStudii,
            [
                jeVeStudiiColumns.id_studie.columnName,
                jeVeStudiiColumns.id_pacient_db.columnName,
            ],
            [studyId, patientId]
        )
        return true
    } catch (err) {
        return false
    }
}

export const deleteStudy = async (data: RowRecordType): Promise<boolean> => {
    const id = data[studieColumns.id.columnName] as number
    try {
        await deleteRow(tableName, id)
        await deleteRowsBy(
            TableNames.jeVeStudii,
            [jeVeStudiiColumns.id_studie.columnName],
            [id]
        )
        return true
    } catch (err) {
        return false
    }
}
