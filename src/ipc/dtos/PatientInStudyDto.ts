import { FormType } from '../../backend/constants'
export interface PatientInStudyDto {
    id?: number
    id_pacient_db?: number
    id_studie?: number
    typ_pacienta?: FormType
}
