import React, { useState } from 'react';
import {
    Paper,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Box
} from '@mui/material';
import { TTestValue } from '../../../../../frontend/enums/statistics.enums';

interface TTestValueSelectorProps {
    selectedValue: TTestValue;
    setSelectedValue: React.Dispatch<React.SetStateAction<TTestValue>>;
}

const TTestValueSelector: React.FC<TTestValueSelectorProps> = ({ 
    selectedValue,
    setSelectedValue
 }) => {
    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value as TTestValue;
        setSelectedValue(newValue);
    };

    const valueOptions = [
        { value: TTestValue.AGE, label: 'Věk pacienta' },
        { value: TTestValue.PACK_YEAR, label: 'Počet balíčko roků' },
        { value: TTestValue.TUMOR_SIZE, label: 'Velikost nádoru (mm)' },
    ];

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                Vyberte hodnotu pro T-Test
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
    );
};

export default TTestValueSelector;