import { PatientDto } from '../../ipc/dtos/PatientDto'
import { StudyDto } from '../../ipc/dtos/StudyDto'
import { FormType, NewTableNames } from '../constants'
import * as patientRepository from '../repositories/patientRepository'
import * as studyRepository from '../repositories/studyRepository'
import { decryptPatientData } from '../utils/patientEncryption'

// Cross-repository operations that need coordination

export const deletePatientWithStudies = async (
    data: PatientDto
): Promise<boolean> => {
    const patientId = data.id as number
    await studyRepository.deletePatientFromAllStudies(patientId)
    return patientRepository.deletePatient(data)
}

export const savePatientWithStudies = async (
    data: PatientDto,
    studies: StudyDto[]
): Promise<number | null> => {
    const patientId = await patientRepository.savePatient(data)
    if (patientId && studies.length > 0) {
        await studyRepository.updatePatientsStudies(
            patientId,
            data.form_type as FormType,
            studies
        )
    }
    return patientId
}

// Re-export single-repository operations for convenience
export {
    getAllPatients,
    getPatient,
    getPatientsByType,
    getFilteredPatients,
    getKaplanMeierData,
    searchPatientsByNameSurnameRC,
    getPlannedPatientsBetweenDates,
    getChiSquareContingencyTable,
    getTTestData,
    savePatient,
} from '../repositories/patientRepository'
