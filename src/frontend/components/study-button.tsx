import React, { useState } from 'react'
import { Study } from '../types'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { ipcAPIDeleteChannels, ipcAPISaveChannels } from '../../ipc/ipcChannels'
import { studyTypeToStringMap } from '../constants'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'

interface StudyButtonProps {
    defaultStudy: Study
    isActiveStudy: boolean
    setActiveStudy: React.Dispatch<React.SetStateAction<Study | null>>
    setListChanged: React.Dispatch<React.SetStateAction<boolean>>
}

const StudyButton: React.FC<StudyButtonProps> = ({
    defaultStudy,
    isActiveStudy,
    setActiveStudy,
    setListChanged,
}) => {
    const [editStudyName, setEditStudyName] = useState(false)
    const [study, setStudy] = useState<Study>(defaultStudy)
    const [openDeleteStudyDialog, setOpenDeleteStudyDialog] = useState(false)

    const handleStudyNameChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setStudy((prev) => ({ ...prev, nazev_studie: e.target.value }))
    }

    const saveStudyName = async () => {
        const JSONdata = JSON.parse(JSON.stringify(study))
        const result = await window.api.save(
            ipcAPISaveChannels.saveStudy,
            JSONdata
        )

        console.log(result)

        setEditStudyName((prev) => !prev)
        setListChanged((prev) => !prev)
    }

    const handleCancelEditStudyName = () => {
        setStudy((prev) => ({
            ...prev,
            nazev_studie: defaultStudy.nazev_studie,
        }))
        setEditStudyName((prev) => !prev)
        return
    }

    const handleStudyNameSave = async (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === 'Enter') {
            saveStudyName()
        }
        if (e.key === 'Escape') {
            handleCancelEditStudyName()
        }
    }

    const handleDeleteStudy = async () => {
        const JSONdata = JSON.parse(JSON.stringify(study))
        const result = await window.api.delete(
            ipcAPIDeleteChannels.deleteStudy,
            JSONdata
        )

        console.log(result)

        setListChanged((prev) => !prev)
        setActiveStudy(null)
    }

    return (
        <div className="studyButtonDiv">
            {editStudyName ? (
                <TextField
                    onChange={handleStudyNameChange}
                    onKeyDown={handleStudyNameSave}
                    value={study.nazev_studie}
                    id="standard-basic"
                    inputProps={{ style: { textAlign: 'center' } }}
                    variant="standard"
                />
            ) : (
                <Button
                    onClick={() =>
                        setActiveStudy((prevStudy) =>
                            prevStudy?.id === study.id ? null : study
                        )
                    }
                    className={`patientButton ${isActiveStudy ? 'selected' : ''}`}
                >
                    {study.nazev_studie} (
                    {studyTypeToStringMap[study.typ_studie]})
                </Button>
            )}
            {editStudyName ? (
                <>
                    <IconButton onClick={() => saveStudyName()}>
                        <CheckIcon />
                    </IconButton>
                    <IconButton onClick={() => handleCancelEditStudyName()}>
                        <CloseIcon />
                    </IconButton>
                </>
            ) : (
                <IconButton onClick={() => setEditStudyName((prev) => !prev)}>
                    <EditIcon />
                </IconButton>
            )}
            <IconButton onClick={() => setOpenDeleteStudyDialog(true)}>
                <DeleteIcon />
            </IconButton>
            <Dialog open={openDeleteStudyDialog}>
                <DialogTitle>Opravdu chcete smazat tuto studii?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tato akce je nevratná.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteStudyDialog(false)}>
                        Zrušit
                    </Button>
                    <Button color="error" onClick={handleDeleteStudy}>
                        Smazat
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default StudyButton
