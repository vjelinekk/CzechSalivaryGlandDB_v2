import React, { useEffect, useState } from 'react'
import PersonalData from '../../personal-data'
import ParotidBenignGlandDiagnosis from './parotid-benign-gland-diagnosis'
import {
    GlandFormProps,
    ParoditBenignPatientData,
    Study,
} from '../../../../types'
import { FormStates, FormType } from '../../../../constants'
import ParotidBenignGlandTherapy from './parotid-benign-gland-therapy'
import Attachments from '../../attachments'
import Notes from '../../notes'
import AddPatientButton from '../../add-patient-button'
import EditButtons from '../../edit-buttons'
import { useGlandForm } from '../../../../hooks/use-gland-form'
import EditResult from '../../edit-result'
import AvailableStudies from '../../available-studies'
import HistopathologyBenign from '../../histopathology-benign'
import DispensarizationBenign from '../../dispensarization-benign'

const ParotidBenignGlandForm: React.FC<GlandFormProps> = ({
    data,
    defaultFormState,
    editSaved,
    setEditSaved,
    setActiveComponent,
    setActivePatient,
    idStudie,
    defaultSelectedStudies,
}) => {
    const [formData, setFormData] = useState<ParoditBenignPatientData | null>({
        ...data,
        form_type: FormType.parotidBenign,
    })

    const [databaseFormData, setDatabaseFormData] =
        useState<ParoditBenignPatientData | null>(data)

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
            <ParotidBenignGlandDiagnosis
                formData={formData}
                setFormData={setFormData}
                setFormErrors={setFormErrors}
                disabled={formState === FormStates.view}
            />
            <ParotidBenignGlandTherapy
                formData={formData}
                setFormData={setFormData}
                setFormErrors={setFormErrors}
                disabled={formState === FormStates.view}
            />
            <HistopathologyBenign
                formData={formData}
                setFormData={setFormData}
                setFormErrors={setFormErrors}
                disabled={formState === FormStates.view}
            />
            <DispensarizationBenign
                formData={formData}
                setFormData={setFormData}
                disabled={formState === FormStates.view}
            />
            <Attachments
                formData={formData}
                setFormData={setFormData}
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
                setStudiesChanged={setStudiesChanged}
                setSelectedStudies={setSelectedStudies}
                disabled={formState === FormStates.view}
            />
            <AddPatientButton
                formState={formState}
                selectedStudies={selectedStudies}
                formData={formData}
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

export default ParotidBenignGlandForm
