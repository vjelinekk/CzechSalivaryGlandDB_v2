import React, { useState } from 'react'
import { ipcAPIInsertChannels } from '../../../../ipc/ipcChannels'
import { FormStates, FormType } from '../../../constants'
import { GlandFormProps, SublingualPatientData } from '../../../types'
import Attachments from '../attachments'
import Dispensarization from '../dispensarization'
import Notes from '../notes'
import PersonalData from '../personal-data'
import TNMClassification from '../tnm-classification'
import SublingualGlandTherapy from './sublingual-gland-therapy'
import SublingualGlandDiagnosis from './sublingual-gland-diagnosis'
import Histopathology from '../histopathology'

const SublingualGlandForm: React.FC<GlandFormProps> = ({ data, formState }) => {
    const [formData, setFormData] = useState<SublingualPatientData | null>({
        ...data,
        form_type: FormType.podjazykove,
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
            <SublingualGlandDiagnosis
                formData={formData}
                setFormData={setFormData}
                disabled={formState === FormStates.view}
            />
            <SublingualGlandTherapy
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

export default SublingualGlandForm
