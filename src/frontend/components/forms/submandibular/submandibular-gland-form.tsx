import React, { useState } from 'react'
import { ipcAPIInsertChannels } from '../../../../ipc/ipcChannels'
import { FormStates, FormType } from '../../../constants'
import { GlandFormProps, SubmandibularPatientData } from '../../../types'
import Attachments from '../attachments'
import Dispensarization from '../dispensarization'
import Histopathology from '../histopathology'
import Notes from '../notes'
import PersonalData from '../personal-data'
import TNMClassification from '../tnm-classification'
import SubmandibularGlandDiagnosis from './submandibular-gland-diagnosis'
import SubmandibularGlandTherapy from './submandibular-gland-therapy'

const SubmandibularGlandForm: React.FC<GlandFormProps> = ({
    data,
    formState,
}) => {
    const [formData, setFormData] = useState<SubmandibularPatientData | null>({
        ...data,
        form_type: FormType.podcelistni,
    })
    const [formErrors, setFormErrors] = useState<string[]>([])

    const handleButtonClick = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()
        const JSONdata = JSON.parse(JSON.stringify(formData))
        const result = await window.api.insert(
            ipcAPIInsertChannels.insertPatient,
            JSONdata
        )
        console.log(result)
    }

    return (
        <form className="form">
            <PersonalData
                formData={formData}
                setFormData={setFormData}
                setFormErrors={setFormErrors}
                disabled={formState === FormStates.view}
            />
            <SubmandibularGlandDiagnosis
                formData={formData}
                setFormData={setFormData}
                disabled={formState === FormStates.view}
            />
            <SubmandibularGlandTherapy
                formData={formData}
                setFormData={setFormData}
                disabled={formState === FormStates.view}
            />
            <Histopathology
                formData={formData}
                setFormData={setFormData}
                disabled={formState === FormStates.view}
            />
            <TNMClassification
                formData={formData}
                setFormData={setFormData}
                disabled={formState === FormStates.view}
            />
            <Dispensarization
                formData={formData}
                setFormData={setFormData}
                disabled={formState === FormStates.view}
            />
            <Attachments
                setFormData={setFormData}
                formData={formData}
                disabled={formState === FormStates.view}
            />
            <Notes
                formData={formData}
                setFormData={setFormData}
                disabled={formState === FormStates.view}
            />
            {formState === FormStates.add && (
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

export default SubmandibularGlandForm
