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

    const handleStudyNameChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setStudy((prev) => ({ ...prev, nazev_studie: e.target.value }))
    }

    const saveStudyName = async () => {
        const prompt = window.confirm(
            `Opravdu chcete změnit název studie na ${study.nazev_studie}?`
        )

        if (!prompt) {
            setStudy((prev) => ({
                ...prev,
                nazev_studie: defaultStudy.nazev_studie,
            }))
            setEditStudyName((prev) => !prev)
            return
        }

        const JSONdata = JSON.parse(JSON.stringify(study))
        const result = await window.api.save(
            ipcAPISaveChannels.saveStudy,
            JSONdata
        )

        if (!result) {
            window.alert('Nepodařilo se uložit studii')
        }

        setEditStudyName((prev) => !prev)
        setListChanged((prev) => !prev)
    }

    const handleStudyNameSave = async (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === 'Enter') {
            saveStudyName()
        }
    }

    const handleDeleteStudy = async () => {
        const prompt = window.confirm(
            `Opravdu chcete smazat studii ${study.nazev_studie}?`
        )

        if (!prompt) {
            return
        }

        const JSONdata = JSON.parse(JSON.stringify(study))
        const result = await window.api.delete(
            ipcAPIDeleteChannels.deleteStudy,
            JSONdata
        )

        if (!result) {
            window.alert('Nepodařilo se smazat studii')
        }

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
                    <IconButton
                        onClick={() => setEditStudyName((prev) => !prev)}
                    >
                        <CloseIcon />
                    </IconButton>
                </>
            ) : (
                <IconButton onClick={() => setEditStudyName((prev) => !prev)}>
                    <EditIcon />
                </IconButton>
            )}
            <IconButton onClick={handleDeleteStudy}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}

export default StudyButton
