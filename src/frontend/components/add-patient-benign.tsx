import React from 'react'
import { Components } from '../constants'
import { ActiveComponentState } from '../types'
import { Box, Typography, Paper, Grid, Button, Divider } from '@mui/material'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'

import { useTranslation } from 'react-i18next'
import { appTranslationKeys } from '../translations'
interface AddPatientProps {
    setActiveComponent: React.Dispatch<
        React.SetStateAction<ActiveComponentState>
    >
}

const AddPatientBenign: React.FC<AddPatientProps> = ({
    setActiveComponent,
}) => {
    const { t } = useTranslation()

    const handleButtonClick = (componentName: Components) => {
        setActiveComponent({ component: componentName })
    }

    return (
        <Box
            sx={{
                p: 3,
                maxWidth: 900,
                mx: 'auto',
            }}
        >
            <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
                    Přidání nového pacienta
                </Typography>
                <Divider
                    sx={{ mb: 2, borderColor: '#2e7d32', borderWidth: 2 }}
                />
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Výběr postižené slinné žlázy pro pacienta s nezhoubným
                    nádorem
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Button
                            id="add-parotid-benign-gland"
                            variant="contained"
                            fullWidth
                            size="large"
                            startIcon={<MedicalInformationIcon />}
                            onClick={() =>
                                handleButtonClick(
                                    Components.parotidBenignGlandForm
                                )
                            }
                            sx={{
                                bgcolor: '#4caf50',
                                py: 1.5,
                                px: 2,
                                textTransform: 'none',
                                height: '100%',
                                whiteSpace: 'nowrap',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                '&:hover': {
                                    bgcolor: '#388e3c',
                                },
                            }}
                        >
                            Příušní žláza
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button
                            id="add-submandibular-benign-gland"
                            variant="contained"
                            fullWidth
                            size="large"
                            startIcon={<MedicalInformationIcon />}
                            onClick={() =>
                                handleButtonClick(
                                    Components.submandibularBenignGlandForm
                                )
                            }
                            sx={{
                                bgcolor: '#4caf50',
                                py: 1.5,
                                px: 2,
                                textTransform: 'none',
                                height: '100%',
                                whiteSpace: 'nowrap',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                '&:hover': {
                                    bgcolor: '#388e3c',
                                },
                            }}
                        >
                            Podčelistní žláza
                        </Button>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, display: 'flex', alignItems: 'center' }}>
                    <Box
                        sx={{
                            width: 12,
                            height: 12,
                            bgcolor: '#4caf50',
                            borderRadius: '50%',
                            mr: 1,
                        }}
                    />
                    <Typography variant="body2" color="text.secondary">
                        Zadáváte pacienta s <strong>nezhoubným</strong> nádorem
                    </Typography>
                </Box>
            </Paper>
        </Box>
    )
}

export default AddPatientBenign
