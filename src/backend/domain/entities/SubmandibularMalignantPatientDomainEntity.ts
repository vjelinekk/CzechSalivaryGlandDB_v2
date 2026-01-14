import { BasePatientDomainEntity } from './BasePatientDomainEntity'

export interface SubmandibularMalignantPatientDomainEntity
    extends BasePatientDomainEntity {
    funkce_n_vii_dle_h_b_predoperacne?: string
    funkce_n_vii_dle_h_b_pooperacne?: string
}
