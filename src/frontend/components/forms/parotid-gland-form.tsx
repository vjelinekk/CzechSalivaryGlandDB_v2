import React, { useState } from 'react'
import PersonalData from './personal-data'
import { ParotidPatientData } from '../../types'

const ParotidGlandForm = () => {
    const [formData, setFormData] = useState<ParotidPatientData | null>(null)
    const [formErrors, setFormErrors] = useState<string[]>([])

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log(formData)
        console.log(formErrors)
    }

    return (
        <>
            <form className="form 3">
                <PersonalData
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
