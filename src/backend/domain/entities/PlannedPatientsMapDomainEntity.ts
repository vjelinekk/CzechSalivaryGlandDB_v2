import { PatientDomainEntity } from './PatientDomainEntity'

export interface PlannedPatientsMapDomainEntity {
    [key: string]: PatientDomainEntity[]
}
