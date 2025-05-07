import React from 'react'
import { Components } from '../constants'
import { ActiveComponentState } from '../types'
import { Box, Typography, Paper, Grid, Button, Divider } from '@mui/material'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

interface AddPatientProps {
    setActiveComponent: React.Dispatch<
        React.SetStateAction<ActiveComponentState>
    >
}

const AddPatient: React.FC<AddPatientProps> = ({ setActiveComponent }) => {
    const handleButtonClick = (componentName: Components) => {
        setActiveComponent({ component: componentName })
    }

    return (
        <Box
            sx={{
                p: 3,
                maxWidth: 1000,
                mx: 'auto',
            }}
        >
            <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
                    Přidání nového pacienta
                </Typography>
                <Divider
                    sx={{ mb: 2, borderColor: '#1976d2', borderWidth: 2 }}
                />
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Výběr typu nádorového onemocnění slinných žláz
                </Typography>

                <Grid container spacing={3} sx={{ mb: 2 }}>
                    <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                        <Button
                            id="add-benign-patient"
                            variant="contained"
                            fullWidth
                            size="large"
                            startIcon={<HealthAndSafetyIcon />}
                            onClick={() =>
                                handleButtonClick(Components.addPatientBenign)
                            }
                            sx={{
                                bgcolor: '#4caf50',
                                py: 3,
                                px: 4,
                                height: '100%',
                                textTransform: 'none',
                                fontSize: '1.1rem',
                                whiteSpace: 'nowrap',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                '&:hover': {
                                    bgcolor: '#388e3c',
                                },
                            }}
                        >
                            Nezhoubný nádor (benigní)
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                        <Button
                            id="add-malignant-patient"
                            variant="contained"
                            fullWidth
                            size="large"
                            startIcon={<ErrorOutlineIcon />}
                            onClick={() =>
                                handleButtonClick(
                                    Components.addPatientMalignant
                                )
                            }
                            sx={{
                                bgcolor: '#f44336',
                                py: 3,
                                px: 4,
                                height: '100%',
                                textTransform: 'none',
                                fontSize: '1.1rem',
                                whiteSpace: 'nowrap',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                '&:hover': {
                                    bgcolor: '#d32f2f',
                                },
                            }}
                        >
                            Zhoubný nádor (maligní)
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default AddPatient
