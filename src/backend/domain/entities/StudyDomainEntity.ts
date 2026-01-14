import { StudyType } from '../../constants'

export interface StudyDomainEntity {
    id?: number
    nazev_studie?: string
    typ_studie?: StudyType
}
