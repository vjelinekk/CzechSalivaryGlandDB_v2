export interface HistopathologyEntity {
    id_patient?: number
    id_histology_type: number
    id_histology_subtype?: number
    tumor_size: number
    tumor_size_not_determined_reason: string
    resection_margin: 'R0' | 'R1'
    lymphovascular_invasion: number // boolean
    perineural_invasion: number // boolean
    number_of_metastatic_lymph_nodes: number
    extranodal_extension: number // boolean
    ene_result: 'ENEma (>2 mm)' | 'ENEmi (≤2 mm)'
    proven_distant_metastasis: number // boolean
    site_of_distant_metastasis: string
    note: string
}
