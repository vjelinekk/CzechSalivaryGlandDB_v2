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
        console.log(JSONdata)
        const result = await window.api.save(
            ipcAPISaveChannels.savePatient,
            JSONdata
        )
        console.log(result)

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
                <Dialog open={openDelePatientDialog}>
                    <DialogTitle>Opravdu chcete smazat pacienta?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Tato akce je nevratná.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => setOpenDeletePatientDialog(false)}
                        >
                            Zrušit
                        </Button>
                        <Button color="error" onClick={handleDeleteClick}>
                            Smazat
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
                            Odebrat z studie
                        </button>
                        <Dialog open={openDeleteFromStudyDialog}>
                            <DialogTitle>
                                Opravdu chcete odebrat pacienta ze studie?
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Pacienta je možné po odebrání znovu přidat
                                    do studie.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={() =>
                                        setOpenDeleteFromStudyDialog(false)
                                    }
                                >
                                    Zrušit
                                </Button>
                                <Button
                                    color="error"
                                    onClick={handleDeleteFromStudy}
                                >
                                    Odebrat
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
