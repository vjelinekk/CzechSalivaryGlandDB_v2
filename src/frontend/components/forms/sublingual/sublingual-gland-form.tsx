import React, { useEffect, useState } from 'react'
import { FormStates, FormType } from '../../../constants'
import { GlandFormProps, Study, SublingualPatientData } from '../../../types'
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
import AvailableStudies from '../available-studies'

const SublingualGlandForm: React.FC<GlandFormProps> = ({
    data,
    defaultFormState,
    editSaved,
    setEditSaved,
    setActiveComponent,
    setActivePatient,
    idStudie,
    defaultSelectedStudies,
}) => {
    const [formData, setFormData] = useState<SublingualPatientData | null>({
        ...data,
        form_type: FormType.podjazykove,
    })

    const [databaseFormData, setDatabaseFormData] =
        useState<SublingualPatientData | null>(data)

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

export default SublingualGlandForm
