import React, { useEffect, useState } from 'react'
import PersonalData from '../personal-data'
import ParotidGlandDiagnosis from './parotid-gland-diagnosis'
import { GlandFormProps, ParotidPatientData, Study } from '../../../types'
import { FormStates, FormType } from '../../../constants'
import ParotidGlandTherapy from './parotid-gland-therapy'
import Histopathology from '../histopathology'
import TNMClassification from '../tnm-classification'
import Dispensarization from '../dispensarization'
import Attachments from '../attachments'
import Notes from '../notes'
import AddPatientButton from '../add-patient-button'
import EditButtons from '../edit-buttons'
import { useGlandForm } from '../../../hooks/use-gland-form'
import EditResult from '../edit-result'
import AvailableStudies from '../available-studies'

const ParotidGlandForm: React.FC<GlandFormProps> = ({
    data,
    defaultFormState,
    editSaved,
    setEditSaved,
    setActiveComponent,
    setActivePatient,
    idStudie,
    defaultSelectedStudies,
}) => {
    const [formData, setFormData] = useState<ParotidPatientData | null>({
        ...data,
        form_type: FormType.priusni,
    })

    const [databaseFormData, setDatabaseFormData] =
        useState<ParotidPatientData | null>(data)

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

export default ParotidGlandForm
