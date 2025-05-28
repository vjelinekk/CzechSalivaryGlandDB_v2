import React from 'react'
import { Components } from '../constants'
import { ActiveComponentState } from '../types'
import { useTranslation } from 'react-i18next'
import { appTranslationKeys } from '../translations'
import { Box, Typography, Paper, Grid, Button, Divider } from '@mui/material'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'

interface AddPatientProps {
    setActiveComponent: React.Dispatch<
        React.SetStateAction<ActiveComponentState>
    >
}

const AddPatientMalignant: React.FC<AddPatientProps> = ({
    setActiveComponent,
}) => {
    const { t } = useTranslation()

    const handleButtonClick = (componentName: Components) => {
        setActiveComponent({ component: componentName })
    }

    // Common button style to ensure consistency
    const buttonStyle = {
        bgcolor: '#f44336',
        py: 1.5,
        px: 4,
        height: '100%',
        textTransform: 'none',
        whiteSpace: 'nowrap',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        '&:hover': {
            bgcolor: '#d32f2f',
        },
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
                    {t(appTranslationKeys.addNewPatient)}
                </Typography>
                <Divider
                    sx={{ mb: 2, borderColor: '#d32f2f', borderWidth: 2 }}
                />

                {/* Use equal height container for all grid items */}
                <Box sx={{ display: 'flex', width: '100%' }}>
                    <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
                        <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
                            <Button
                                id="add-parotid-gland"
                                variant="contained"
                                fullWidth
                                size="large"
                                startIcon={<MedicalInformationIcon />}
                                onClick={() =>
                                    handleButtonClick(
                                        Components.parotidMalignantGlandForm
                                    )
                                }
                                sx={buttonStyle}
                            >
                                {t(appTranslationKeys.parotidGland)}
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
                            <Button
                                id="add-submandibular-gland"
                                variant="contained"
                                fullWidth
                                size="large"
                                startIcon={<MedicalInformationIcon />}
                                onClick={() =>
                                    handleButtonClick(
                                        Components.submandibularMalignantGlandForm
                                    )
                                }
                                sx={buttonStyle}
                            >
                                {t(appTranslationKeys.submandibularGland)}
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
                            <Button
                                id="add-sublingual-gland"
                                variant="contained"
                                fullWidth
                                size="large"
                                startIcon={<MedicalInformationIcon />}
                                onClick={() =>
                                    handleButtonClick(
                                        Components.sublingualMalignantGlandForm
                                    )
                                }
                                sx={buttonStyle}
                            >
                                {t(appTranslationKeys.sublingualGland)}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ mt: 4, display: 'flex', alignItems: 'center' }}>
                    <Box
                        sx={{
                            width: 12,
                            height: 12,
                            bgcolor: '#f44336',
                            borderRadius: '50%',
                            mr: 1,
                        }}
                    />
                    <Typography variant="body2" color="text.secondary">
                        {t(appTranslationKeys.addingPatientWithMalignantTumor)}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    )
}

export default AddPatientMalignant
