import React, { Dispatch, SetStateAction } from 'react'
import { Components, StudyType } from '../constants'
import { ActiveComponentState } from '../types'
import { useTranslation } from 'react-i18next'
import { appTranslationKeys } from '../translations'
import { Box, Button, Stack } from '@mui/material'

interface AddStudyProps {
    setActiveComponent: Dispatch<SetStateAction<ActiveComponentState>>
}

const AddStudy: React.FC<AddStudyProps> = ({ setActiveComponent }) => {
    const { t } = useTranslation()

    const handleButtonClick = (studyType: StudyType) => {
        setActiveComponent({ component: Components.study, studyType })
    }

    return (
        <Box
            id="studies"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: 2,
            }}
        >
            <Stack spacing={2} sx={{ minWidth: 300 }}>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => handleButtonClick(StudyType.parotid)}
                    sx={{ py: 1.5 }}
                >
                    {t(appTranslationKeys.newStudyParotid)}
                </Button>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => handleButtonClick(StudyType.submandibular)}
                    sx={{ py: 1.5 }}
                >
                    {t(appTranslationKeys.newStudySubmandibular)}
                </Button>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => handleButtonClick(StudyType.sublingual)}
                    sx={{ py: 1.5 }}
                >
                    {t(appTranslationKeys.newStudySublingual)}
                </Button>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => handleButtonClick(StudyType.special)}
                    sx={{ py: 1.5 }}
                >
                    {t(appTranslationKeys.newStudySpecial)}
                </Button>
            </Stack>
        </Box>
    )
}

export default AddStudy
