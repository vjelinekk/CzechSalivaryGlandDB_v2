import { decrypt, encrypt } from './encryption'
import { PatientDto } from '../../ipc/dtos/PatientDto'

export const decryptPatientData = (patientData: PatientDto[]): PatientDto[] => {
    return patientData.map((patient) => {
        const decryptedPatient: PatientDto = { ...patient }

        if (patient.jmeno) {
            const [encryptedName, iv] = patient.jmeno.split(':')
            decryptedPatient.jmeno = decrypt(
                encryptedName,
                Buffer.from(iv, 'hex')
            )
        }

        if (patient.prijmeni) {
            const [encryptedSurname, iv] = patient.prijmeni.split(':')
            decryptedPatient.prijmeni = decrypt(
                encryptedSurname,
                Buffer.from(iv, 'hex')
            )
        }

        if (patient.rodne_cislo) {
            const [encryptedRC, iv] = patient.rodne_cislo.split(':')
            decryptedPatient.rodne_cislo = decrypt(
                encryptedRC,
                Buffer.from(iv, 'hex')
            )
        }

        return decryptedPatient
    })
}

export const encryptPatientData = (patientData: PatientDto): PatientDto => {
    const encryptedPatient: PatientDto = { ...patientData }

    if (patientData.jmeno) {
        const { encrypted: encryptedName, iv } = encrypt(
            patientData.jmeno as string
        )
        encryptedPatient.jmeno = encryptedName + ':' + iv.toString('hex')
    }

    if (patientData.prijmeni) {
        const { encrypted: encryptedSurname, iv } = encrypt(
            patientData.prijmeni as string
        )
        encryptedPatient.prijmeni = encryptedSurname + ':' + iv.toString('hex')
    }

    if (patientData.rodne_cislo) {
        const { encrypted: encryptedRC, iv } = encrypt(
            patientData.rodne_cislo as string
        )
        encryptedPatient.rodne_cislo = encryptedRC + ':' + iv.toString('hex')
    }

    return encryptedPatient
}
