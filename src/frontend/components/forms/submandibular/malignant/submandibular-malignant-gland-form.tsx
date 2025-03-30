import React, { useEffect, useState } from 'react'
import { FormStates, FormType } from '../../../../constants'
import { useGlandForm } from '../../../../hooks/use-gland-form'
import {
    GlandFormProps,
    Study,
    SubmandibularPatientData,
} from '../../../../types'
import AddPatientButton from '../../add-patient-button'
import Attachments from '../../attachments'
import AvailableStudies from '../../available-studies'
import Dispensarization from '../../dispensarization-malignant'
import EditButtons from '../../edit-buttons'
import EditResult from '../../edit-result'
import Histopathology from '../../histopathology-malignant'
import Notes from '../../notes'
import PersonalData from '../../personal-data'
import TNMClassification from '../../tnm-classification'
import SubmandibularMalignantGlandDiagnosis from './submandibular-malignant-gland-diagnosis'
import SubmandibularGlandTherapy from './submandibular-malignant-gland-therapy'

const SubmandibularGlandForm: React.FC<GlandFormProps> = ({
    data,
    defaultFormState,
    editSaved,
    setEditSaved,
    setActiveComponent,
    setActivePatient,
    idStudie,
    defaultSelectedStudies,
}) => {
    const [formData, setFormData] = useState<SubmandibularPatientData | null>({
        ...data,
        form_type: FormType.podcelistni,
    })

    const [databaseFormData, setDatabaseFormData] =
        useState<SubmandibularPatientData | null>(data)

    const [selectedStudies, setSelectedStudies] = useState<Study[]>(
        defaultSelectedStudies || []
    )

    const [databaseSelectedStudies, setDatabaseSelectedStudies] = useState<
        Study[]
    >(defaultSelectedStudies || [])

    const [studiesChanged, setStudiesChanged] = useState(false)

    useEffect(() => {
        setSelectedStudies(defaultSelectedStudies || [])
        setDatabaseSelectedStudies(defaultSelectedStudies || [])
    }, [defaultSelectedStudies])

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
            <SubmandibularMalignantGlandDiagnosis
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
            <AvailableStudies
                formType={formData.form_type}
                selectedStudies={selectedStudies}
                setSelectedStudies={setSelectedStudies}
                setStudiesChanged={setStudiesChanged}
                disabled={formState === FormStates.view}
            />
            <AddPatientButton
                formState={formState}
                formData={formData}
                selectedStudies={selectedStudies}
                formErrors={formErrors}
                setActiveComponent={setActiveComponent}
            />
            <EditButtons
                formData={formData}
                setFormData={setFormData}
                databaseFormData={databaseFormData}
                setDatabaseFormData={setDatabaseFormData}
                selectedStudies={selectedStudies}
                setSelectedStudies={setSelectedStudies}
                databaseSelectedStudies={databaseSelectedStudies}
                setDatabaseSelectedStudies={setDatabaseSelectedStudies}
                studiesChanged={studiesChanged}
                formState={formState}
                formErrors={formErrors}
                setFormState={setFormState}
                setEditSaved={setEditSaved}
                setActivePatient={setActivePatient}
                idStudie={idStudie}
            />
        </form>
    )
}

export default SubmandibularGlandForm
