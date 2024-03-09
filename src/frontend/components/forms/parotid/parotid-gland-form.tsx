import React, { useState } from 'react'
import PersonalData from '../personal-data'
import ParotidGlandDiagnosis from './parotid-gland-diagnosis'
import { GlandFormProps, ParotidPatientData } from '../../../types'
import { FormStates, FormType } from '../../../constants'
import ParotidGlandTherapy from './parotid-gland-therapy'
import Histopathology from '../histopathology'
import TNMClassification from '../tnm-classification'
import Dispensarization from '../dispensarization'
import Attachments from '../attachments'
import Notes from '../notes'
import { ipcAPIInsertChannels } from '../../../../ipc/ipcChannels'

const ParotidGlandForm: React.FC<GlandFormProps> = ({ data, formState }) => {
    const [formData, setFormData] = useState<ParotidPatientData | null>({
        ...data,
        form_type: FormType.priusni,
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
            <ParotidGlandDiagnosis
                formData={formData}
                setFormData={setFormData}
                setFormErrors={setFormErrors}
                disabled={formState === FormStates.view}
            />
            <ParotidGlandTherapy
                formData={formData}
                setFormData={setFormData}
                setFormErrors={setFormErrors}
                disabled={formState === FormStates.view}
            />
            <Histopathology
                formData={formData}
                setFormData={setFormData}
                setFormErrors={setFormErrors}
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

export default ParotidGlandForm
