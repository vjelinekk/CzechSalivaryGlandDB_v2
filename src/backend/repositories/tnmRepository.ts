import { TnmEditionEntity } from '../db-entities/TnmEditionEntity'
import { TnmValueDefinitionEntity } from '../db-entities/TnmValueDefinitionEntity'
import { TnmStageRuleEntity } from '../db-entities/TnmStageRuleEntity'
import { PatientStagingEntity } from '../db-entities/PatientStagingEntity'
import { runQuery, runQueryAll, runInsert, runDelete } from './dbHelpers'

export const getActiveEdition = async (): Promise<TnmEditionEntity | null> => {
    const row = await runQuery<TnmEditionEntity>(
        'SELECT * FROM tnm_edition WHERE is_active = 1 LIMIT 1'
    )
    return row ?? null
}

export const getTnmEditionById = async (
    editionId: number
): Promise<TnmEditionEntity | null> => {
    const row = await runQuery<TnmEditionEntity>(
        'SELECT * FROM tnm_edition WHERE id = ?',
        [editionId]
    )
    return row ?? null
}

export const getAllTnmEditions = async (): Promise<TnmEditionEntity[]> => {
    return runQueryAll<TnmEditionEntity>(
        'SELECT * FROM tnm_edition ORDER BY active_from DESC'
    )
}

export const getTnmValuesByEdition = async (
    editionId: number,
    category?: 'T' | 'N' | 'M' | 'G'
): Promise<TnmValueDefinitionEntity[]> => {
    if (category) {
        return runQueryAll<TnmValueDefinitionEntity>(
            'SELECT * FROM tnm_value_definition WHERE edition_id = ? AND category = ? ORDER BY sort_order',
            [editionId, category]
        )
    }
    return runQueryAll<TnmValueDefinitionEntity>(
        'SELECT * FROM tnm_value_definition WHERE edition_id = ? ORDER BY sort_order',
        [editionId]
    )
}

export const getTnmValueById = async (
    valueId: number
): Promise<TnmValueDefinitionEntity | null> => {
    const row = await runQuery<TnmValueDefinitionEntity>(
        'SELECT * FROM tnm_value_definition WHERE id = ?',
        [valueId]
    )
    return row ?? null
}

export const getStageRulesByEdition = async (
    editionId: number
): Promise<TnmStageRuleEntity[]> => {
    return runQueryAll<TnmStageRuleEntity>(
        'SELECT * FROM tnm_stage_rule WHERE id_edition = ? ORDER BY priority DESC',
        [editionId]
    )
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

export const getPatientStaging = async (
    patientId: number
): Promise<PatientStagingEntity | null> => {
    const row = await runQuery<PatientStagingEntity>(
        'SELECT * FROM patient_staging WHERE id_patient = ?',
        [patientId]
    )
    return row ?? null
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

const insertPatientStaging = async (
    staging: PatientStagingEntity
): Promise<number | null> => {
    return runInsert('patient_staging', {
        id_patient: staging.id_patient,
        id_edition: staging.id_edition,
        clinical_t_id: staging.clinical_t_id,
        clinical_n_id: staging.clinical_n_id,
        clinical_m_id: staging.clinical_m_id,
        clinical_grade_id: staging.clinical_grade_id,
        pathological_t_id: staging.pathological_t_id,
        pathological_n_id: staging.pathological_n_id,
        pathological_m_id: staging.pathological_m_id,
        pathological_grade_id: staging.pathological_grade_id,
    })
}

const updatePatientStaging = async (
    staging: PatientStagingEntity
): Promise<number | null> => {
    await runQueryAll(
        `UPDATE patient_staging SET
            id_edition = ?,
            clinical_t_id = ?,
            clinical_n_id = ?,
            clinical_m_id = ?,
            clinical_grade_id = ?,
            pathological_t_id = ?,
            pathological_n_id = ?,
            pathological_m_id = ?,
            pathological_grade_id = ?
        WHERE id_patient = ?`,
        [
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
    )
    return staging.id_patient
}

export const deletePatientStaging = async (
    patientId: number
): Promise<boolean> => {
    await runDelete('patient_staging', patientId, 'id_patient')
    return true
}
