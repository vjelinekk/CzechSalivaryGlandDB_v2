import React, { Dispatch, SetStateAction } from 'react'
import { ActiveComponentState, PatientType } from '../types'
import {
    Box,
    Button,
    Grid,
    Paper,
    Stack,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    TextField,
} from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { cs } from 'date-fns/locale'
import { usePlannedChecks } from '../hooks/use-planned-checks'
import { Components } from '../constants'
import { useTranslation } from 'react-i18next'
import { appTranslationKeys } from '../translations'

interface PlannedChecksProps {
    setActiveComponent: Dispatch<SetStateAction<ActiveComponentState>>
    setActiveMenuButton?: Dispatch<SetStateAction<Components>>
}

const PlannedChecks: React.FC<PlannedChecksProps> = ({
    setActiveComponent,
    setActiveMenuButton,
}) => {
    const { t } = useTranslation()
    const { plannedDaysRows, startDate, setStartDate, endDate, setEndDate } =
        usePlannedChecks()

    const handleExportPDF = async () => {
        // TODO: Implement PDF export functionality
        // e.g., await window.export.exportPlannedChecksToPDF(startDate, endDate);
        console.log('Exporting to PDF...')
    }

    const handleOpenPatientDetail = (patient: PatientType) => {
        setActiveComponent({
            component: Components.patientsList,
            activePatient: patient,
        })

        if (setActiveMenuButton) {
            setActiveMenuButton(Components.patientsList)
        }
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('cs-CZ', {
            weekday: 'short',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        })
    }

    return (
        <Box sx={{ p: 3, width: '100%' }}>
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 4 }}
            >
                <Box sx={{ width: 200 }} />

                <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={cs}
                >
                    <Stack direction="row" spacing={2} alignItems="center">
                        <DatePicker
                            label={t(appTranslationKeys.from)}
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <Typography>–</Typography>
                        <DatePicker
                            label={t(appTranslationKeys.to)}
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>

                <Button
                    variant="contained"
                    startIcon={<PictureAsPdfIcon />}
                    onClick={handleExportPDF}
                >
                    {t(appTranslationKeys.exportPdf)}
                </Button>
            </Stack>

            {plannedDaysRows.map((row, rowIndex) => (
                <Box key={`row-${rowIndex}`} sx={{ mb: 3 }}>
                    <Grid container spacing={3}>
                        {row.map((day, index) => (
                            <Grid
                                item
                                xs={12}
                                mb={2}
                                sm={6}
                                md={4}
                                lg={2.4}
                                key={`day-${index}`}
                            >
                                <Paper
                                    elevation={3}
                                    sx={{
                                        p: 2,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        align="center"
                                        sx={{
                                            mb: 1,
                                            fontWeight: 'bold',
                                            color: 'primary.main',
                                        }}
                                    >
                                        {formatDate(day.date)}
                                    </Typography>

                                    <Divider sx={{ mb: 2 }} />

                                    <List dense sx={{ flexGrow: 1 }}>
                                        {day.patients.map((patient) => (
                                            <ListItem
                                                key={
                                                    patient.form_type +
                                                    '-' +
                                                    patient.id
                                                }
                                                button
                                                onClick={() =>
                                                    handleOpenPatientDetail(
                                                        patient
                                                    )
                                                }
                                                sx={{
                                                    borderRadius: 1,
                                                    '&:hover': {
                                                        backgroundColor:
                                                            'rgba(25, 118, 210, 0.08)',
                                                    },
                                                    transition:
                                                        'background-color 0.3s',
                                                    mb: 0.5,
                                                }}
                                            >
                                                <ListItemText
                                                    primary={`${patient.jmeno} ${patient.prijmeni}`}
                                                    primaryTypographyProps={{
                                                        fontWeight: 'medium',
                                                        color: 'primary.main',
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}

            {plannedDaysRows.length === 0 && (
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                    {t(appTranslationKeys.noPlannedChecks)}
                </Typography>
            )}
        </Box>
    )
}

export default PlannedChecks
