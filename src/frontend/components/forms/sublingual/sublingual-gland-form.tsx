import React, { useState } from 'react'
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
import AddPatientButton from '../add-patient-button'
import EditButtons from '../edit-buttons'
import { useGlandForm } from '../../../hooks/use-gland-form'
import EditResult from '../edit-result'

const SublingualGlandForm: React.FC<GlandFormProps> = ({
    data,
    defaultFormState,
    editSaved,
    setEditSaved,
    setActiveComponent,
    setActivePatient,
}) => {
    const [formData, setFormData] = useState<SublingualPatientData | null>({
        ...data,
        form_type: FormType.podjazykove,
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

export default SublingualGlandForm
