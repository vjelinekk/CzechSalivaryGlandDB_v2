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
import { formTranslationKeys } from '../../translations'
import { Box, Card } from '@mui/material'
import { Edit } from '@mui/icons-material'
import ChevronRight from '@mui/icons-material/ChevronRight'
import { keyframes } from '@emotion/react'

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
`

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
    const [expand, setExpand] = useState(false)

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
            <Card
                id="editButtons"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 1,
                    gap: 1,
                }}
            >
                <Button
                    onClick={() => setExpand((prev) => !prev)}
                    sx={{
                        minWidth: 0,
                        padding: 0.5,
                    }}
                    disableRipple
                    variant={!expand ? 'contained' : 'text'}
                    color="primary"
                >
                    {expand ? <ChevronRight /> : <Edit />}
                </Button>

                {/* Only render the content when expanded */}
                {expand && (
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            alignItems: 'center',
                            animation: `${fadeIn} 0.2s ease`,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {formState === FormStates.edit && (
                            <>
                                <Button
                                    type="submit"
                                    onClick={handleCancelButtonClick}
                                    color="secondary"
                                    disableRipple
                                >
                                    {t(formTranslationKeys.cancelEdit)}
                                </Button>
                                <Button
                                    type="submit"
                                    onClick={handleSaveButtonClick}
                                    disabled={formErrors.length > 0}
                                    color="secondary"
                                    disableRipple
                                >
                                    {t(formTranslationKeys.saveChanges)}
                                </Button>
                            </>
                        )}
                        {formState === FormStates.view && (
                            <Button
                                onClick={handleEditButtonClick}
                                color="secondary"
                                disableRipple
                            >
                                {t(formTranslationKeys.editPatient)}
                            </Button>
                        )}
                        <Button
                            onClick={handleDeleteButtonClick}
                            color="error"
                            disableRipple
                        >
                            {t(formTranslationKeys.deletePatient)}
                        </Button>
                        {idStudie && (
                            <Button
                                onClick={handleDeleteFromStudyClick}
                                color="error"
                                disableRipple
                            >
                                {t(formTranslationKeys.removeFromStudy)}
                            </Button>
                        )}
                    </Box>
                )}

                <Dialog open={openDelePatientDialog}>
                    <DialogTitle>
                        {t(formTranslationKeys.confirmDeletePatient)}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t(formTranslationKeys.deletePatientWarning)}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => setOpenDeletePatientDialog(false)}
                            disableRipple
                        >
                            {t(formTranslationKeys.cancel)}
                        </Button>
                        <Button color="error" onClick={handleDeleteClick}>
                            {t(formTranslationKeys.delete)}
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openDeleteFromStudyDialog}>
                    <DialogTitle>
                        {t(formTranslationKeys.confirmRemoveFromStudy)}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t(formTranslationKeys.removeFromStudyWarning)}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => setOpenDeleteFromStudyDialog(false)}
                        >
                            {t(formTranslationKeys.cancel)}
                        </Button>
                        <Button color="error" onClick={handleDeleteFromStudy}>
                            {t(formTranslationKeys.remove)}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        )
    )
}

export default EditButtons
