import React from 'react'
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    Paper,
} from '@mui/material'
import { NonParametricTestType } from '../../../../enums/statistics.enums'

interface Props {
    selectedTestType: NonParametricTestType
    setSelectedTestType: React.Dispatch<
        React.SetStateAction<NonParametricTestType>
    >
    title: string
}

const NonParametricTestTailSelector: React.FC<Props> = ({
    selectedTestType,
    setSelectedTestType,
    title,
}) => {
    const handleTestTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newTestType = event.target.value as NonParametricTestType
        setSelectedTestType(newTestType)
    }

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <FormControl component="fieldset">
                <FormLabel component="legend">
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                </FormLabel>
                <RadioGroup
                    value={selectedTestType}
                    onChange={handleTestTypeChange}
                    name="t-test-type"
                >
                    <FormControlLabel
                        value={NonParametricTestType.ONE_TAILED_LEFT}
                        control={<Radio />}
                        label="Jednostranný test (levá hodnota > pravá hodnota)"
                    />
                    <FormControlLabel
                        value={NonParametricTestType.ONE_TAILED_RIGHT}
                        control={<Radio />}
                        label="Jednostranný test (pravá hodnota > levá hodnota)"
                    />
                    <FormControlLabel
                        value={NonParametricTestType.TWO_TAILED}
                        control={<Radio />}
                        label="Dvoustranný test"
                    />
                </RadioGroup>
            </FormControl>
        </Paper>
    )
}

export default NonParametricTestTailSelector
