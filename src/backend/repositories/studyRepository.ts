import { NewTableNames } from '../constants'
import { StudyDto } from '../../ipc/dtos/StudyDto'
import { PatientInStudyDto } from '../../ipc/dtos/PatientInStudyDto'
import { StudyMapper } from '../mappers/StudyMapper'
import { StudyEntity } from '../db-entities/StudyEntity'
import {
    runQuery,
    runQueryAll,
    runInsert,
    runUpdate,
    runDelete,
    runDeleteWhere,
} from './dbHelpers'

export const insertStudy = async (data: StudyDto): Promise<number | null> => {
    try {
        const entity = StudyMapper.toPersistence(data)
        return await runInsert(NewTableNames.study, { ...entity })
    } catch (err) {
        return null
    }
}

export const updateStudy = async (data: StudyDto): Promise<number | null> => {
    try {
        const entity = StudyMapper.toPersistence(data)
        await runUpdate(NewTableNames.study, data.id as number, { ...entity })
        return data.id as number
    } catch (err) {
        return null
    }
}

export const saveStudy = async (data: StudyDto): Promise<number | null> => {
    const existingStudy = await runQuery<StudyEntity>(
        `SELECT * FROM ${NewTableNames.study} WHERE id = ?`,
        [data.id]
    )
    if (existingStudy) {
        return await updateStudy(data)
    } else {
        return await insertStudy(data)
    }
}

export const insertPatientToStudy = async (
    data: PatientInStudyDto
): Promise<boolean> => {
    try {
        await runInsert(NewTableNames.isInStudy, {
            id_study: data.id_study,
            id_patient: data.id_patient,
        })
        return true
    } catch (err) {
        return false
    }
}

export const updatePatientsStudies = async (
    patientId: number,
    studies: StudyDto[]
): Promise<boolean> => {
    try {
        // Delete all existing study associations for this patient
        await runDeleteWhere(NewTableNames.isInStudy, [
            { column: 'id_patient', value: patientId },
        ])

        // Insert new associations
        await Promise.all(
            studies.map((study) =>
                insertPatientToStudy({
                    id_study: study.id,
                    id_patient: patientId,
                })
            )
        )
        return true
    } catch (err) {
        return false
    }
}

export const getStudies = async (): Promise<StudyDto[]> => {
    try {
        const entities = await runQueryAll<StudyEntity>(
            `SELECT * FROM ${NewTableNames.study}`
        )
        return StudyMapper.toDtoList(entities)
    } catch (err) {
        return []
    }
}

export const getStudiesByFormType = async (
    formType: number
): Promise<StudyDto[]> => {
    // Study type 4 is "special" which includes all form types
    const query = `
        SELECT * FROM ${NewTableNames.study}
        WHERE study_type = ? OR study_type = 4
    `
    try {
        const entities = await runQueryAll<StudyEntity>(query, [formType])
        return StudyMapper.toDtoList(entities)
    } catch (err) {
        return []
    }
}

export const getStudiesByPatientId = async (
    patientId: number
): Promise<StudyDto[]> => {
    const query = `
        SELECT s.*
        FROM ${NewTableNames.study} s
        INNER JOIN ${NewTableNames.isInStudy} iis ON s.id = iis.id_study
        WHERE iis.id_patient = ?
    `

    try {
        const entities = await runQueryAll<StudyEntity>(query, [patientId])
        return StudyMapper.toDtoList(entities)
    } catch (err) {
        return []
    }
}

export const deletePatientFromAllStudies = async (
    patientId: number
): Promise<boolean> => {
    try {
        await runDeleteWhere(NewTableNames.isInStudy, [
            { column: 'id_patient', value: patientId },
        ])
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
        await runDeleteWhere(NewTableNames.isInStudy, [
            { column: 'id_study', value: studyId },
            { column: 'id_patient', value: patientId },
        ])
        return true
    } catch (err) {
        return false
    }
}

export const deleteStudy = async (data: StudyDto): Promise<boolean> => {
    const id = data.id as number
    try {
        await runDelete(NewTableNames.study, id)
        // Note: is_in_study entries will be deleted automatically via CASCADE
        return true
    } catch (err) {
        return false
    }
}
