import React, { Dispatch, SetStateAction } from 'react'
import { Typography, Button, Stack, Checkbox, Box } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import { formTypeToStringMap } from '../constants'
import { PatientType } from '../types'

interface PatientButtonProps {
    patient: PatientType
    setActivePatient: Dispatch<SetStateAction<PatientType | null>>
    isActivePatient: boolean
    isSelected: boolean
    setSelectedPatients: Dispatch<SetStateAction<PatientType[]>>
}

const PatientButton: React.FC<PatientButtonProps> = ({
    patient,
    setActivePatient,
    isActivePatient,
    isSelected,
    setSelectedPatients,
}) => {
    const handleOnClick = () => {
        setActivePatient((prevPatient) =>
            prevPatient?.id === patient.id &&
            prevPatient.form_type === patient.form_type
                ? null
                : patient
        )
    }

    const handleOnChange = () => {
        setSelectedPatients((prevPatients) => {
            // Check if patient with same ID and form_type exists in array
            const patientExists = prevPatients.some(
                (p) => p.id === patient.id && p.form_type === patient.form_type
            )

            if (patientExists) {
                // Remove patient if exists
                return prevPatients.filter(
                    (p) =>
                        !(
                            p.id === patient.id &&
                            p.form_type === patient.form_type
                        )
                )
            } else {
                // Add patient if doesn't exist
                return [...prevPatients, patient]
            }
        })
    }

    const isMalignant =
        patient.form_type === 1 ||
        patient.form_type === 2 ||
        patient.form_type === 3
    const label = isMalignant ? 'Z' : 'N'
    const color = isMalignant ? 'red' : 'green'
    const activeColor = '#004aad'

    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                spacing={0}
                sx={{ width: '100%' }}
            >
                <Checkbox checked={isSelected} onChange={handleOnChange} />

                <Button
                    variant={isActivePatient ? 'contained' : 'outlined'}
                    onClick={handleOnClick}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: 1,
                        textTransform: 'none', // Zachová normální velikost písma
                        backgroundColor: isActivePatient
                            ? activeColor
                            : 'transparent',
                        color: isActivePatient ? 'white' : 'black',
                        border: isActivePatient
                            ? 'none'
                            : '1px solid rgba(0, 0, 0, 0.23)',
                        '&:hover': {
                            backgroundColor: isActivePatient
                                ? activeColor
                                : 'rgba(0, 0, 0, 0.04)',
                        },
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <CircleIcon sx={{ color: color, fontSize: 30 }} />
                        <Typography
                            sx={{
                                position: 'absolute',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '0.8rem',
                            }}
                        >
                            {label}
                        </Typography>
                    </Box>

                    <Typography
                        sx={{
                            fontSize: '0.8rem',
                            wordBreak: 'break-word',
                            whiteSpace: 'normal',
                        }}
                    >
                        {patient?.jmeno || ''} {patient?.prijmeni || ''} (
                        {formTypeToStringMap[patient?.form_type] || ''})
                    </Typography>
                </Button>
            </Stack>
        </>
    )
}

export default PatientButton
