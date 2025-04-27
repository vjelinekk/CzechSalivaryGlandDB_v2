import React from 'react'
import { ActiveComponentState } from '../types'
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
import { useTranslation } from 'react-i18next'

interface PlannedChecksProps {
    setActiveComponent: React.Dispatch<
        React.SetStateAction<ActiveComponentState>
    >
}

const PlannedChecks: React.FC<PlannedChecksProps> = ({
    // TODO: Decide if we will enable clicking on the patients to open their details
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setActiveComponent,
}) => {
    const { t } = useTranslation()
    const { plannedDaysRows, startDate, setStartDate, endDate, setEndDate } =
        usePlannedChecks()

    const handleExportPDF = async () => {
        // TODO: Implement PDF export functionality
        // e.g., await window.export.exportPlannedChecksToPDF(startDate, endDate);
        console.log('Exporting to PDF...')
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
                            label={t('from')}
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <Typography>–</Typography>
                        <DatePicker
                            label={t('to')}
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
                    {t('export-pdf')}
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
                                            <ListItem key={patient.id}>
                                                <ListItemText
                                                    primary={`${patient.jmeno} ${patient.prijmeni}`}
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
                    {t('no-planned-checks')}
                </Typography>
            )}
        </Box>
    )
}

export default PlannedChecks
