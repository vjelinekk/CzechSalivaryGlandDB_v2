import React, { useState } from 'react'
import PersonalData from './personal-data'
import ParotidGlandDiagnosis from './parotid-gland-diagnosis'
import { ParotidPatientData } from '../../types'
import { formStates } from '../../constants'
import ParotidGlandTherapy from './parotid-gland-therapy'
import ParotidGlandHistopathology from './parotid-gland-histopathology'
import TNMClassification from './tnm-classification'
import Dispensarization from './dispensarization'
import Attachments from './attachments'

interface ParotidGlandFormProps {
    data?: ParotidPatientData
    formState: formStates
}

const ParotidGlandForm: React.FC<ParotidGlandFormProps> = ({
    data,
    formState,
}) => {
    const [formData, setFormData] = useState<ParotidPatientData | null>(data)
    const [formErrors, setFormErrors] = useState<string[]>([])

    const handleButtonClick = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()
        console.log(formData)
        console.log(formErrors)
        const res = await window.api.send(formData)
        console.log(res)
    }

    return (
        <form className="form">
            <PersonalData
                formData={formData}
                setFormData={setFormData}
                setFormErrors={setFormErrors}
                disabled={formState === formStates.view}
            />
            <ParotidGlandDiagnosis
                formData={formData}
                setFormData={setFormData}
                setFormErrors={setFormErrors}
                disabled={formState === formStates.view}
            />
            <ParotidGlandTherapy
                formData={formData}
                setFormData={setFormData}
                setFormErrors={setFormErrors}
                disabled={formState === formStates.view}
            />
            <ParotidGlandHistopathology
                formData={formData}
                setFormData={setFormData}
                setFormErrors={setFormErrors}
                disabled={formState === formStates.view}
            />
            <TNMClassification
                formData={formData}
                setFormData={setFormData}
                disabled={formState === formStates.view}
            />
            <Dispensarization
                formData={formData}
                setFormData={setFormData}
                disabled={formState === formStates.view}
            />
            <Attachments
                formData={formData}
                setFormData={setFormData}
                disabled={formState === formStates.view}
            />
            {formState === formStates.add && (
                <>
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
                </>
            )}
        </form>
    )
}

export default ParotidGlandForm
