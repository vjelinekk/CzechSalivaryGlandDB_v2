import { NewTableNames } from '../constants'
import db from '../dbManager'
import { decryptPatientData } from '../utils/patientEncryption'
import { StudyDto } from '../../ipc/dtos/StudyDto'
import { PatientInStudyDto } from '../../ipc/dtos/PatientInStudyDto'
import { PatientDto } from '../../ipc/dtos/PatientDto'
import { StudyMapper } from '../mappers/StudyMapper'
import { StudyEntity } from '../db-entities/StudyEntity'

// Helper to run a query and return a single row
const runQuery = <T>(
    query: string,
    params: unknown[] = []
): Promise<T | undefined> => {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) reject(err)
            else resolve(row as T | undefined)
        })
    })
}

// Helper to run a query and return all rows
const runQueryAll = <T>(
    query: string,
    params: unknown[] = []
): Promise<T[]> => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) reject(err)
            else resolve(rows as T[])
        })
    })
}

// Helper to run a delete query with custom conditions
const runDeleteWhere = (
    tableName: string,
    conditions: { column: string; value: unknown }[]
): Promise<void> => {
    return new Promise((resolve, reject) => {
        const whereClause = conditions
            .map((c) => `${c.column} = ?`)
            .join(' AND ')
        const values = conditions.map((c) => c.value)
        const query = `DELETE FROM ${tableName} WHERE ${whereClause}`
        db.run(query, values, (err) => {
            if (err) reject(err)
            else resolve()
        })
    })
}

// Helper to run an insert
const runInsert = (
    tableName: string,
    data: Record<string, unknown>
): Promise<number> => {
    return new Promise((resolve, reject) => {
        const columns = Object.keys(data).filter(
            (key) => data[key] !== undefined
        )
        const values = columns.map((key) => data[key])
        const placeholders = columns.map(() => '?').join(', ')

        const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`

        db.run(query, values, function (err) {
            if (err) reject(err)
            else resolve(this.lastID)
        })
    })
}

// Helper to run an update
const runUpdate = (
    tableName: string,
    id: number,
    data: Record<string, unknown>
): Promise<number> => {
    return new Promise((resolve, reject) => {
        const columns = Object.keys(data).filter(
            (key) => key !== 'id' && data[key] !== undefined
        )
        const values = columns.map((key) => data[key])
        const setClause = columns.map((col) => `${col} = ?`).join(', ')

        const query = `UPDATE ${tableName} SET ${setClause} WHERE id = ?`

        db.run(query, [...values, id], function (err) {
            if (err) reject(err)
            else resolve(this.changes)
        })
    })
}

// Helper to run a delete by ID
const runDelete = (tableName: string, id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM ${tableName} WHERE id = ?`
        db.run(query, [id], (err) => {
            if (err) reject(err)
            else resolve()
        })
    })
}

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
    _patientType: number, // Kept for backward compatibility, no longer used
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
    patientId: number,
    _patientType?: number // Kept for backward compatibility, no longer used
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
    patientId: number,
    _patientType?: number // Kept for backward compatibility, no longer used
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
