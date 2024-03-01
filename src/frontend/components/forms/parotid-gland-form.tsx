import React, { useState } from 'react'
import PersonalData from './personal-data'
import { ParotidPatientData, PatientData } from '../../types'

interface ParotidGlandFormProps {
    data: PatientData
}

const ParotidGlandForm: React.FC<ParotidGlandFormProps> = ({ data }) => {
    const [formData, setFormData] = useState<ParotidPatientData | null>(data)
    const [formErrors, setFormErrors] = useState<string[]>([])

    const handleButtonClick = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()
        console.log(formData)
        console.log(formErrors)
        const res = await window.api.send('add-patient', formData)
        console.log(res)
    }

    return (
        <>
            <form className="form">
                <PersonalData
                    formData={formData}
                    setFormData={setFormData}
                    setFormErrors={setFormErrors}
                />
                <div className="divider"></div>
                <div className="addPatientButtonDiv">
                    <button
                        className="basicButton"
                        disabled={formErrors.length > 0}
                        onClick={handleButtonClick}
                    >
                        Přidat pacienta
                    </button>
                </div>
            </form>
        </>
    )
}

export default ParotidGlandForm
