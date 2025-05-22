import React, { useEffect, useState } from 'react'
import { ipcAPIGetChannels } from '../../ipc/ipcChannels'
import { Study } from '../types'
import StudyButton from './study-button'
import PatientsList from './patients-list'
import {
    Stack,
    Box,
    TextField,
    InputAdornment,
    Typography,
    Paper,
    Divider,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FolderOffIcon from '@mui/icons-material/FolderOff'

import { useTranslation } from 'react-i18next'
import { appTranslationKeys } from '../translations'
interface StudiesListProps {
    defaultActiveStudy?: Study
}

const StudiesList: React.FC<StudiesListProps> = ({ defaultActiveStudy }) => {
    const { t } = useTranslation()
    const [studies, setStudies] = useState<Study[]>([])
    const [activeStudy, setActiveStudy] = useState<Study | null>(
        defaultActiveStudy || null
    )
    const [listChanged, setListChanged] = useState(false)

    const getStudies = async () => {
        const studies = await window.api.get(ipcAPIGetChannels.getStudies)
        setStudies(studies)
    }

    useEffect(() => {
        getStudies()
    }, [listChanged])

    const handleStudiesSearch = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const search = event.target.value.toLowerCase()

        if (search === '') {
            getStudies()
        }

        const allStudies: Study[] = await window.api.get(
            ipcAPIGetChannels.getStudies
        )

        const filteredStudies = allStudies.filter((study) =>
            study.nazev_studie.toLowerCase().includes(search)
        )

        setStudies(filteredStudies)
    }

    return (
        <Stack direction="row" spacing={2} sx={{ p: 2, height: '100%' }}>
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    width: '25%',
                    minWidth: '280px',
                    maxWidth: '350px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Seznam studií
                </Typography>

                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Vyhledat studii..."
                    margin="normal"
                    onChange={handleStudiesSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <Divider sx={{ my: 2 }} />

                <Box
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#888',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#555',
                        },
                    }}
                >
                    {studies.length > 0 ? (
                        <Stack spacing={1}>
                            {studies.map((study, index) => (
                                <Paper
                                    key={index}
                                    elevation={1}
                                    sx={{
                                        border:
                                            study.id === activeStudy?.id
                                                ? 2
                                                : 0,
                                        borderColor: 'primary.main',
                                    }}
                                >
                                    <StudyButton
                                        key={study.id}
                                        defaultStudy={study}
                                        isActiveStudy={
                                            study.id === activeStudy?.id
                                        }
                                        setActiveStudy={setActiveStudy}
                                        setListChanged={setListChanged}
                                    />
                                </Paper>
                            ))}
                        </Stack>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                p: 3,
                                color: 'text.secondary',
                                textAlign: 'center',
                            }}
                        >
                            <FolderOffIcon
                                sx={{ fontSize: 60, mb: 2, opacity: 0.7 }}
                            />
                            <Typography variant="h6" gutterBottom>
                                Žádné studie nenalezeny
                            </Typography>
                            <Typography variant="body2">
                                Nebyla nalezena žádná studie. Vytvořte novou
                                studii nebo upravte vyhledávání.
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Paper>

            <Box sx={{ flexGrow: 1, height: '100%' }}>
                {activeStudy ? (
                    <PatientsList
                        idStudie={activeStudy?.id}
                        studyType={activeStudy.typ_studie}
                    />
                ) : (
                    <Paper
                        elevation={3}
                        sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 4,
                        }}
                    >
                        <Typography variant="h6" color="textSecondary">
                            Vyberte studii ze seznamu pro zobrazení pacientů
                        </Typography>
                    </Paper>
                )}
            </Box>
        </Stack>
    )
}

export default StudiesList
