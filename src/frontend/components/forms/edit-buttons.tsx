import React, { Dispatch, SetStateAction } from 'react'
import {
    ipcAPIDeleteChannels,
    ipcAPISaveChannels,
} from '../../../ipc/ipcChannels'
import { FormStates } from '../../constants'
import { EditSavedState, PatientType, Study } from '../../types'

interface EditButtonsProps {
    formState: FormStates
    formData: PatientType
    setFormData: Dispatch<SetStateAction<PatientType | null>>
    databaseFormData: PatientType
    setDatabaseFormData: Dispatch<SetStateAction<PatientType>>
    selectedStudies: Study[]
    setSelectedStudies: Dispatch<SetStateAction<Study[]>>
    databaseSelectedStudies: Study[]
    setDatabaseSelectedStudies: Dispatch<SetStateAction<Study[]>>
    studiesChanged: boolean
    formErrors: string[]
    setFormState: Dispatch<SetStateAction<FormStates>>
    setEditSaved: Dispatch<SetStateAction<EditSavedState>>
    setActivePatient: Dispatch<SetStateAction<PatientType | null>>
    idStudie?: number
}

const EditButtons: React.FC<EditButtonsProps> = ({
    formState,
    formData,
    setFormData,
    databaseFormData,
    setDatabaseFormData,
    selectedStudies,
    setSelectedStudies,
    databaseSelectedStudies,
    setDatabaseSelectedStudies,
    studiesChanged,
    formErrors,
    setFormState,
    setEditSaved,
    setActivePatient,
    idStudie,
}) => {
    const handleEditButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setFormState(FormStates.edit)
    }

    const handleDeleteButtonClick = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()
        const confirmDeletion = window.confirm(
            'Opravdu chcete smazat pacienta?'
        )
        if (!confirmDeletion) {
            return
        }
        const JSONdata = JSON.parse(JSON.stringify(formData))
        const result = await window.api.delete(
            ipcAPIDeleteChannels.deletePatient,
            JSONdata
        )

        if (result) {
            setActivePatient(null)
        }
    }

    const handleDeleteFromStudyClick = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()
        const result = await window.api.deletePatientFromStudy(
            idStudie,
            formData?.id,
            formData?.form_type
        )
        console.log(result)
        setActivePatient(null)
    }

    const handleCancelButtonClick = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()
        setFormState(FormStates.view)
        setFormData(databaseFormData)
        setSelectedStudies(databaseSelectedStudies)
    }

    const handleSaveButtonClick = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()
        const JSONdata = JSON.parse(JSON.stringify(formData))
        const result = await window.api.save(
            ipcAPISaveChannels.savePatient,
            JSONdata
        )

        if (studiesChanged) {
            const updated = await window.api.updatePatientsStudies(
                formData.id,
                formData.form_type,
                selectedStudies
            )
            console.log(updated)
        }

        setEditSaved((prevEditSaved) => {
            return {
                done: !prevEditSaved.done,
                saved: result !== null,
            }
        })

        setDatabaseFormData(formData)
        setDatabaseSelectedStudies(selectedStudies)
    }

    return (
        (formState === FormStates.edit || formState === FormStates.view) && (
            <div id="editButtons">
                {formState === FormStates.edit && (
                    <>
                        <button
                            className="basicButton"
                            type="submit"
                            onClick={handleCancelButtonClick}
                        >
                            Zrušit editaci
                        </button>
                        <button
                            className="basicButton"
                            type="submit"
                            onClick={handleSaveButtonClick}
                            disabled={formErrors.length > 0}
                        >
                            Uložit změny
                        </button>
                    </>
                )}
                {formState === FormStates.view && (
                    <button
                        className="basicButton"
                        onClick={handleEditButtonClick}
                    >
                        Editovat
                    </button>
                )}
                <button
                    onClick={handleDeleteButtonClick}
                    className="basicButton"
                    style={{ background: 'red' }}
                >
                    Smazat pacienta
                </button>
                {idStudie && (
                    <button
                        className="basicButton"
                        onClick={handleDeleteFromStudyClick}
                        style={{ background: 'red' }}
                    >
                        Odebrat z studie
                    </button>
                )}
            </div>
        )
    )
}

export default EditButtons
