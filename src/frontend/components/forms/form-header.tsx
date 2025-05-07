import React from 'react'
import { Box, Chip } from '@mui/material'
import { FormType } from '../../constants'

interface FormHeaderProps {
    formType: FormType
}

const FormHeader: React.FC<FormHeaderProps> = ({ formType }) => {
    // Define gland types and their labels
    const glandTypes = {
        parotid: 'Příušní žláza',
        submandibular: 'Podčelistní žláza',
        sublingual: 'Podjazyková žláza',
    }

    // Define patient types and their styling
    const patientTypes = {
        benign: {
            label: 'Nezhoubný',
            color: '#2e7d32',
            lightColor: 'rgba(46, 125, 50, 0.08)',
        },
        malignant: {
            label: 'Zhoubný',
            color: '#d32f2f',
            lightColor: 'rgba(211, 47, 47, 0.08)',
        },
    }

    // Determine gland and patient type based on formType
    let glandType: keyof typeof glandTypes = 'parotid'
    let patientType: keyof typeof patientTypes = 'benign'

    if (formType === FormType.parotidBenign) {
        glandType = 'parotid'
        patientType = 'benign'
    } else if (formType === FormType.parotidMalignant) {
        glandType = 'parotid'
        patientType = 'malignant'
    } else if (formType === FormType.submandibularBenign) {
        glandType = 'submandibular'
        patientType = 'benign'
    } else if (formType === FormType.submandibularMalignant) {
        glandType = 'submandibular'
        patientType = 'malignant'
    } else if (formType === FormType.sublingualMalignant) {
        glandType = 'sublingual'
        patientType = 'malignant'
    }

    // Get the styling based on patient type
    const typeStyle = patientTypes[patientType]

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 2,
                mb: 2,
                pb: 1.5,
                borderBottom: '1px solid #e0e0e0',
            }}
        >
            <Chip
                label={typeStyle.label + ' - ' + glandTypes[glandType]}
                size="small"
                sx={{
                    backgroundColor: typeStyle.lightColor,
                    color: typeStyle.color,
                    fontWeight: 500,
                    border: `1px solid ${typeStyle.color}`,
                    '& .MuiChip-label': { px: 1.5 },
                }}
            />
        </Box>
    )
}

export default FormHeader
