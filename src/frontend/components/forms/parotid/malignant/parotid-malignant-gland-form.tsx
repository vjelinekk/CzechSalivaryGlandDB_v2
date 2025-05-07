import React, { useEffect, useState } from 'react'
import PersonalData from '../../personal-data'
import ParotidMalignantGlandDiagnosis from './parotid-malignant-gland-diagnosis'
import {
    GlandFormProps,
    ParotidMalignantPatientData,
    Study,
} from '../../../../types'
import { FormStates, FormType } from '../../../../constants'
import ParotidMalignantGlandTherapy from './parotid-malignant-gland-therapy'
import HistopathologyMalignant from '../../histopathology-malignant'
import TNMClassification from '../../tnm-classification'
import Dispensarization from '../../dispensarization-malignant'
import Attachments from '../../attachments'
import Notes from '../../notes'
import AddPatientButton from '../../add-patient-button'
import EditButtons from '../../edit-buttons'
import { useGlandForm } from '../../../../hooks/use-gland-form'
import EditResult from '../../edit-result'
import AvailableStudies from '../../available-studies'
import FormHeader from '../../form-header'

const ParotidMalignantGlandForm: React.FC<GlandFormProps> = ({
    data,
    defaultFormState,
    editSaved,
    setEditSaved,
    setActiveComponent,
    setActivePatient,
    idStudie,
    defaultSelectedStudies,
    setActiveMenuButton,
}) => {
    const [formData, setFormData] =
        useState<ParotidMalignantPatientData | null>({
            ...data,
            form_type: FormType.parotidMalignant,
        })

    const [databaseFormData, setDatabaseFormData] =
        useState<ParotidMalignantPatientData | null>(data)

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
            {formState === FormStates.add && (
                <FormHeader formType={formData.form_type} />
            )}
            <EditResult editSaved={editSaved} setEditSaved={setEditSaved} />
            <PersonalData
                formData={formData}
                setFormData={setFormData}
                setFormErrors={setFormErrors}
                disabled={formState === FormStates.view}
            />
            <ParotidMalignantGlandDiagnosis
                formData={formData}
                setFormData={setFormData}
                setFormErrors={setFormErrors}
                disabled={formState === FormStates.view}
            />
            <ParotidMalignantGlandTherapy
                formData={formData}
                setFormData={setFormData}
                setFormErrors={setFormErrors}
                disabled={formState === FormStates.view}
            />
            <HistopathologyMalignant
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
                setActiveMenuButton={setActiveMenuButton}
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

export default ParotidMalignantGlandForm
