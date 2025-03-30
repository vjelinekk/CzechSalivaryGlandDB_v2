import React, { useEffect, useState } from 'react'
import { FormStates, FormType } from '../../../../constants'
import { useGlandForm } from '../../../../hooks/use-gland-form'
import {
    GlandFormProps,
    Study,
    SubmandibularBenignPatientData,
} from '../../../../types'
import AddPatientButton from '../../add-patient-button'
import Attachments from '../../attachments'
import AvailableStudies from '../../available-studies'
import EditButtons from '../../edit-buttons'
import EditResult from '../../edit-result'
import Notes from '../../notes'
import PersonalData from '../../personal-data'
import SubmandibularBenignGlandDiagnosis from './submandibular-benign-gland-diagnosis'
import SubmandibularBenignGlandTherapy from './submandibular-benign-gland-therapy'
import HistopathologyBenign from '../../histopathology-benign'
import DispensarizationBenign from '../../dispensarization-benign'

const SubmandibularBenignGlandForm: React.FC<GlandFormProps> = ({
    data,
    defaultFormState,
    editSaved,
    setEditSaved,
    setActiveComponent,
    setActivePatient,
    idStudie,
    defaultSelectedStudies,
}) => {
    const [formData, setFormData] =
        useState<SubmandibularBenignPatientData | null>({
            ...data,
            form_type: FormType.submandibularBenign,
        })

    const [databaseFormData, setDatabaseFormData] =
        useState<SubmandibularBenignPatientData | null>(data)

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
            <SubmandibularBenignGlandDiagnosis
                formData={formData}
                setFormData={setFormData}
                disabled={formState === FormStates.view}
            />
            <SubmandibularBenignGlandTherapy
                formData={formData}
                setFormData={setFormData}
                disabled={formState === FormStates.view}
            />
            <HistopathologyBenign
                formData={formData}
                setFormData={setFormData}
                disabled={formState === FormStates.view}
            />
            <DispensarizationBenign
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

export default SubmandibularBenignGlandForm
