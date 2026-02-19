export interface MalignantPatientEntity {
    id_patient?: number
    block_neck_dissection: number // boolean
    side_of_neck_dissection: string
    type_of_nd: string
    extent_of_nd: string
    adjuvant_therapy: string
    type_of_non_surgical_therapy: string
}
