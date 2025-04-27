import React, { Dispatch, SetStateAction, useState } from 'react'
import {
    ipcAPIDeleteChannels,
    ipcAPISaveChannels,
} from '../../../ipc/ipcChannels'
import { FormStates } from '../../constants'
import { EditSavedState, PatientType, Study } from '../../types'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'

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
    const { t } = useTranslation()
    const [openDelePatientDialog, setOpenDeletePatientDialog] = useState(false)
    const [openDeleteFromStudyDialog, setOpenDeleteFromStudyDialog] =
        useState(false)

    const handleEditButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setFormState(FormStates.edit)
    }

    const handleDeleteButtonClick = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()
        setOpenDeletePatientDialog(true)
    }

    const handleDeleteClick = async () => {
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
        setOpenDeleteFromStudyDialog(true)
    }

    const handleDeleteFromStudy = async () => {
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
                            {t('cancel-edit')}
                        </button>
                        <button
                            className="basicButton"
                            type="submit"
                            onClick={handleSaveButtonClick}
                            disabled={formErrors.length > 0}
                        >
                             {t('save-changes')}
                        </button>
                    </>
                )}
                {formState === FormStates.view && (
                    <button
                        className="basicButton"
                        onClick={handleEditButtonClick}
                    >
                        {t('edit-patient')}
                    </button>
                )}
                <button
                    onClick={handleDeleteButtonClick}
                    className="basicButton"
                    style={{ background: 'red' }}
                >
                    {t('delete-patient')}
                </button>
                <Dialog open={openDelePatientDialog}>
                    <DialogTitle>{t('confirm-delete-patient')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t('delete-patient-warning')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDeletePatientDialog(false)}>
                            {t('cancel')}
                        </Button>
                        <Button color="error" onClick={handleDeleteClick}>
                            {t('delete')}
                        </Button>
                    </DialogActions>
                </Dialog>
                {idStudie && (
                    <>
                        <button
                            className="basicButton"
                            onClick={handleDeleteFromStudyClick}
                            style={{ background: 'red' }}
                        >
                            {t('remove-from-study')}
                        </button>
                        <Dialog open={openDeleteFromStudyDialog}>
                            <DialogTitle>
                                {t('confirm-remove-from-study')}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {t('remove-from-study-warning')}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenDeleteFromStudyDialog(false)}>
                                    {t('cancel')}
                                </Button>
                                <Button color="error" onClick={handleDeleteFromStudy}>
                                    {t('remove')}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                )}
            </div>
        )
    )
}

export default EditButtons
