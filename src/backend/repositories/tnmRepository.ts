import db from '../dbManager'
import { TnmEditionEntity } from '../db-entities/TnmEditionEntity'
import { TnmValueDefinitionEntity } from '../db-entities/TnmValueDefinitionEntity'
import { TnmStageRuleEntity } from '../db-entities/TnmStageRuleEntity'
import { PatientStagingEntity } from '../db-entities/PatientStagingEntity'

export const getActiveEdition = (): Promise<TnmEditionEntity | null> => {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT * FROM tnm_edition WHERE is_active = 1 LIMIT 1',
            (err, row) => {
                if (err) {
                    console.error('Error fetching active TNM edition:', err)
                    reject(err)
                }
                resolve((row as TnmEditionEntity) || null)
            }
        )
    })
}

export const getTnmEditionById = (
    editionId: number
): Promise<TnmEditionEntity | null> => {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT * FROM tnm_edition WHERE id = ?',
            [editionId],
            (err, row) => {
                if (err) {
                    console.error('Error fetching TNM edition:', err)
                    reject(err)
                }
                resolve((row as TnmEditionEntity) || null)
            }
        )
    })
}

export const getAllTnmEditions = (): Promise<TnmEditionEntity[]> => {
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT * FROM tnm_edition ORDER BY active_from DESC',
            (err, rows) => {
                if (err) {
                    console.error('Error fetching TNM editions:', err)
                    reject(err)
                }
                resolve((rows as TnmEditionEntity[]) || [])
            }
        )
    })
}

export const getTnmValuesByEdition = (
    editionId: number,
    category?: 'T' | 'N' | 'M' | 'G'
): Promise<TnmValueDefinitionEntity[]> => {
    return new Promise((resolve, reject) => {
        let query =
            'SELECT * FROM tnm_value_definition WHERE edition_id = ? ORDER BY sort_order'
        const params: (number | string)[] = [editionId]

        if (category) {
            query =
                'SELECT * FROM tnm_value_definition WHERE edition_id = ? AND category = ? ORDER BY sort_order'
            params.push(category)
        }

        db.all(query, params, (err, rows) => {
            if (err) {
                console.error('Error fetching TNM values:', err)
                reject(err)
            }
            resolve((rows as TnmValueDefinitionEntity[]) || [])
        })
    })
}

export const getTnmValueById = (
    valueId: number
): Promise<TnmValueDefinitionEntity | null> => {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT * FROM tnm_value_definition WHERE id = ?',
            [valueId],
            (err, row) => {
                if (err) {
                    console.error('Error fetching TNM value:', err)
                    reject(err)
                }
                resolve((row as TnmValueDefinitionEntity) || null)
            }
        )
    })
}

export const getStageRulesByEdition = (
    editionId: number
): Promise<TnmStageRuleEntity[]> => {
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT * FROM tnm_stage_rule WHERE id_edition = ? ORDER BY priority DESC',
            [editionId],
            (err, rows) => {
                if (err) {
                    console.error('Error fetching TNM stage rules:', err)
                    reject(err)
                }
                resolve((rows as TnmStageRuleEntity[]) || [])
            }
        )
    })
}

export const calculateStage = async (
    editionId: number,
    tValueId: number | null,
    nValueId: number | null,
    mValueId: number | null
): Promise<TnmValueDefinitionEntity | null> => {
    // Note: We intentionally do NOT return null immediately if inputs are null.
    // Some rules (like M1 -> Stage IVC) apply regardless of T/N values (wildcards).

    const rules = await getStageRulesByEdition(editionId)

    for (const rule of rules) {
        const tMatches =
            rule.t_value_id === null || rule.t_value_id === tValueId
        const nMatches =
            rule.n_value_id === null || rule.n_value_id === nValueId
        const mMatches =
            rule.m_value_id === null || rule.m_value_id === mValueId

        if (tMatches && nMatches && mMatches) {
            return await getTnmValueById(rule.stage_value_id)
        }
    }

    return null
}

export const getPatientStaging = (
    patientId: number
): Promise<PatientStagingEntity | null> => {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT * FROM patient_staging WHERE id_patient = ?',
            [patientId],
            (err, row) => {
                if (err) {
                    console.error('Error fetching patient staging:', err)
                    reject(err)
                }
                resolve((row as PatientStagingEntity) || null)
            }
        )
    })
}

export const savePatientStaging = async (
    staging: PatientStagingEntity
): Promise<number | null> => {
    const existingStaging = await getPatientStaging(staging.id_patient)

    if (existingStaging) {
        return updatePatientStaging(staging)
    } else {
        return insertPatientStaging(staging)
    }
}

const insertPatientStaging = (
    staging: PatientStagingEntity
): Promise<number | null> => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO patient_staging (
                id_patient, id_edition,
                clinical_t_id, clinical_n_id, clinical_m_id, clinical_grade_id,
                pathological_t_id, pathological_n_id, pathological_m_id, pathological_grade_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
        const params = [
            staging.id_patient,
            staging.id_edition,
            staging.clinical_t_id,
            staging.clinical_n_id,
            staging.clinical_m_id,
            staging.clinical_grade_id,
            staging.pathological_t_id,
            staging.pathological_n_id,
            staging.pathological_m_id,
            staging.pathological_grade_id,
        ]

        db.run(query, params, function (err) {
            if (err) {
                console.error('Error inserting patient staging:', err)
                reject(err)
            }
            resolve(this.lastID)
        })
    })
}

const updatePatientStaging = (
    staging: PatientStagingEntity
): Promise<number | null> => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE patient_staging SET
                id_edition = ?,
                clinical_t_id = ?,
                clinical_n_id = ?,
                clinical_m_id = ?,
                clinical_grade_id = ?,
                pathological_t_id = ?,
                pathological_n_id = ?,
                pathological_m_id = ?,
                pathological_grade_id = ?
            WHERE id_patient = ?
        `
        const params = [
            staging.id_edition,
            staging.clinical_t_id,
            staging.clinical_n_id,
            staging.clinical_m_id,
            staging.clinical_grade_id,
            staging.pathological_t_id,
            staging.pathological_n_id,
            staging.pathological_m_id,
            staging.pathological_grade_id,
            staging.id_patient,
        ]

        db.run(query, params, function (err) {
            if (err) {
                console.error('Error updating patient staging:', err)
                reject(err)
            }
            resolve(staging.id_patient)
        })
    })
}

export const deletePatientStaging = (patientId: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        db.run(
            'DELETE FROM patient_staging WHERE id_patient = ?',
            [patientId],
            (err) => {
                if (err) {
                    console.error('Error deleting patient staging:', err)
                    reject(err)
                }
                resolve(true)
            }
        )
    })
}
