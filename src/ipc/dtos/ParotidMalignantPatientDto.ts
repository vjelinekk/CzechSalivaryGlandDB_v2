import { BasePatientDto } from './BasePatientDto'
export interface ParotidMalignantPatientDto extends BasePatientDto {
    funkce_n_vii_dle_h_b_predoperacne?: string
    funkce_n_vii_dle_h_b_pooperacne?: string
    pooperacni_komplikace?: string
    jine_pooperacni_komplikace?: string
}
