import { FormType } from '../../constants'

export interface PatientInStudyDomainEntity {
    id?: number
    id_pacient_db?: number
    id_studie?: number
    typ_pacienta?: FormType
}
