import { ParotidMalignantPatientDomainEntity } from './ParotidMalignantPatientDomainEntity'
import { SubmandibularMalignantPatientDomainEntity } from './SubmandibularMalignantPatientDomainEntity'
import { SublingualMalignantPatientDomainEntity } from './SublingualMalignantPatientDomainEntity'
import { SubmandibularBenignPatientDomainEntity } from './SubmandibularBenignPatientDomainEntity'
import { ParotidBenignPatientDomainEntity } from './ParotidBenignPatientDomainEntity'

export type PatientDomainEntity =
    | ParotidMalignantPatientDomainEntity
    | SubmandibularMalignantPatientDomainEntity
    | SublingualMalignantPatientDomainEntity
    | SubmandibularBenignPatientDomainEntity
    | ParotidBenignPatientDomainEntity
