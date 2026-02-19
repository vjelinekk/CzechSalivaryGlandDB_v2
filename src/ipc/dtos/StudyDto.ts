import { StudyTypeEnum } from './enums/StudyTypeEnum'

export interface StudyDto {
    id?: number
    nazev_studie?: string
    typ_studie?: StudyTypeEnum
}
