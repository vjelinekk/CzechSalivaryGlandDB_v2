export interface BiopsyResultEntity {
    id?: number
    id_patient?: number
    id_histology_type: number
    id_histology_subtype?: number
    biopsy_type: 'core' | 'open'
    note?: string
}
