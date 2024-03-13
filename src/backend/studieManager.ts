import {
    deleteRow,
    getAllRows,
    getRow,
    getRowsBy,
    insertRow,
    updateRow,
} from './basicOperations'
import { FormType, TableNames } from './constants'

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

export const deletePatientFromStudy = async (id: number): Promise<boolean> => {
    try {
        await deleteRow(TableNames.jeVeStudii, id)
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
