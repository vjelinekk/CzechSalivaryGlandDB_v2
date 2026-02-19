import { ParotidMalignantPatientDto } from './ParotidMalignantPatientDto'
import { SubmandibularMalignantPatientDto } from './SubmandibularMalignantPatientDto'
import { SublingualMalignantPatientDto } from './SublingualMalignantPatientDto'
import { SubmandibularBenignPatientDto } from './SubmandibularBenignPatientDto'
import { ParotidBenignPatientDto } from './ParotidBenignPatientDto'

export type PatientDto =
    | ParotidMalignantPatientDto
    | SubmandibularMalignantPatientDto
    | SublingualMalignantPatientDto
    | SubmandibularBenignPatientDto
    | ParotidBenignPatientDto
