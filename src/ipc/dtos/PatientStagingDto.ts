export interface PatientStagingDto {
    id?: number
    id_patient: number
    id_edition: number
    clinical_t_id: number | null
    clinical_n_id: number | null
    clinical_m_id: number | null
    clinical_grade_id: number | null
    pathological_t_id: number | null
    pathological_n_id: number | null
    pathological_m_id: number | null
    pathological_grade_id: number | null
}
