import React, { useEffect, useState } from 'react'
import { FormStates, FormType } from '../../../../constants'
import {
    GlandFormProps,
    Study,
    SublingualMalignantPatientData,
} from '../../../../types'
import Attachments from '../../attachments'
import Dispensarization from '../../dispensarization-malignant'
import Notes from '../../notes'
import PersonalData from '../../personal-data'
import TNMClassification from '../../tnm-classification'
import SublingualMalignantGlandTherapy from './sublingual-malignant-gland-therapy'
import SublingualMalignantGlandDiagnosis from './sublingual-malignant-gland-diagnosis'
import HistopathologyMalignant from '../../histopathology-malignant'
import AddPatientButton from '../../add-patient-button'
import EditButtons from '../../edit-buttons'
import { useGlandForm } from '../../../../hooks/use-gland-form'
import EditResult from '../../edit-result'
import AvailableStudies from '../../available-studies'
import FormHeader from '../../form-header'

const SublingualMalignantGlandForm: React.FC<GlandFormProps> = ({
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
        useState<SublingualMalignantPatientData | null>({
            ...data,
            form_type: FormType.sublingualMalignant,
        })

    const [databaseFormData, setDatabaseFormData] =
        useState<SublingualMalignantPatientData | null>(data)

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
            <SublingualMalignantGlandDiagnosis
                formData={formData}
                setFormData={setFormData}
                disabled={formState === FormStates.view}
            />
            <SublingualMalignantGlandTherapy
                formData={formData}
                setFormData={setFormData}
                disabled={formState === FormStates.view}
            />
            <HistopathologyMalignant
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

export default SublingualMalignantGlandForm
