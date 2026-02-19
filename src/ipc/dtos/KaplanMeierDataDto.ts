import { KaplanMeierPatientDataDto } from './KaplanMeierPatientDataDto'
export interface KaplanMeierDataDto {
    [key: string]: KaplanMeierPatientDataDto[]
}
