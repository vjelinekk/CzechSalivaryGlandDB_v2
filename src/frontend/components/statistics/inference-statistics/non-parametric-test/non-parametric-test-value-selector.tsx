import React from 'react'
import {
    Paper,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Box,
} from '@mui/material'
import { NonParametricTestValue } from '../../../../enums/statistics.enums'

interface Props {
    selectedValue: NonParametricTestValue
    setSelectedValue: React.Dispatch<
        React.SetStateAction<NonParametricTestValue>
    >
    title: string
}

const NonParametricTestValueSelector: React.FC<Props> = ({
    selectedValue,
    setSelectedValue,
    title,
}) => {
    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value as NonParametricTestValue
        setSelectedValue(newValue)
    }

    const valueOptions = [
        { value: NonParametricTestValue.AGE, label: 'Věk pacienta' },
        {
            value: NonParametricTestValue.PACK_YEAR,
            label: 'Počet balíčko roků',
        },
        {
            value: NonParametricTestValue.TUMOR_SIZE,
            label: 'Velikost nádoru (mm)',
        },
    ]

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>

            <Box sx={{ mt: 2 }}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">
                        <Typography variant="subtitle1" gutterBottom>
                            Hodnota pro analýzu
                        </Typography>
                    </FormLabel>
                    <RadioGroup
                        value={selectedValue}
                        onChange={handleValueChange}
                        name="t-test-value"
                    >
                        {valueOptions.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Box>
        </Paper>
    )
}

export default NonParametricTestValueSelector
