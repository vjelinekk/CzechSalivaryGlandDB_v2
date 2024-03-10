import React, { useState } from 'react'
import { FormStates, FormType } from '../../../constants'
import { useGlandForm } from '../../../hooks/use-gland-form'
import { GlandFormProps, SubmandibularPatientData } from '../../../types'
import AddPatientButton from '../add-patient-button'
import Attachments from '../attachments'
import Dispensarization from '../dispensarization'
import EditButtons from '../edit-buttons'
import EditResult from '../edit-result'
import Histopathology from '../histopathology'
import Notes from '../notes'
import PersonalData from '../personal-data'
import TNMClassification from '../tnm-classification'
import SubmandibularGlandDiagnosis from './submandibular-gland-diagnosis'
import SubmandibularGlandTherapy from './submandibular-gland-therapy'

const SubmandibularGlandForm: React.FC<GlandFormProps> = ({
    data,
    defaultFormState,
    editSaved,
    setEditSaved,
    setActiveComponent,
    setActivePatient,
}) => {
    const [formData, setFormData] = useState<SubmandibularPatientData | null>({
        ...data,
        form_type: FormType.podcelistni,
    })

    const { formErrors, formState, setFormErrors, setFormState } = useGlandForm(
        {
            editSaved,
            defaultFormState,
        }
    )

    return (
        <form className="form">
            <EditResult editSaved={editSaved} setEditSaved={setEditSaved} />
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
            <AddPatientButton
                formState={formState}
                formData={formData}
                formErrors={formErrors}
                setActiveComponent={setActiveComponent}
            />
            <EditButtons
                formData={formData}
                formState={formState}
                formErrors={formErrors}
                setFormState={setFormState}
                setEditSaved={setEditSaved}
                setActivePatient={setActivePatient}
            />
        </form>
    )
}

export default SubmandibularGlandForm
