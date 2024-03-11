import React, { Dispatch, SetStateAction } from 'react'
import { formTypeToStringMap } from '../constants'
import { PatientType } from '../types'

interface PatientButtonProps {
    patient: PatientType
    setActivePatient: Dispatch<SetStateAction<PatientType | null>>
    isActivePatient: boolean
    isSelected: boolean
    setSelectedPatients: Dispatch<SetStateAction<PatientType[]>>
}

const PatientButton: React.FC<PatientButtonProps> = ({
    patient,
    setActivePatient,
    isActivePatient,
    isSelected,
    setSelectedPatients,
}) => {
    const handleOnClick = () => {
        setActivePatient((prevPatient) =>
            prevPatient?.id === patient.id &&
            prevPatient.form_type === patient.form_type
                ? null
                : patient
        )
    }

    const handleOnChange = () => {
        setSelectedPatients((prevPatients) =>
            prevPatients.includes(patient)
                ? prevPatients.filter(
                      (prevPatient) => prevPatient.id !== patient.id
                  )
                : [...prevPatients, patient]
        )
    }

    return (
        <>
            <input
                type="checkbox"
                onChange={handleOnChange}
                checked={isSelected}
            />
            <button
                className={`patientButton ${isActivePatient ? 'selected' : ''}`}
                onClick={handleOnClick}
            >
                {patient?.jmeno || ''} {patient?.prijmeni || ''} (
                {formTypeToStringMap[patient.form_type] || ''})
            </button>
        </>
    )
}

export default PatientButton
