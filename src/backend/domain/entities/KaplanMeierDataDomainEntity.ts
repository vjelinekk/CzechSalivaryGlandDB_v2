import { KaplanMeierPatientDataDomainEntity } from './KaplanMeierPatientDataDomainEntity'

export interface KaplanMeierDataDomainEntity {
    [key: string]: KaplanMeierPatientDataDomainEntity[]
}
