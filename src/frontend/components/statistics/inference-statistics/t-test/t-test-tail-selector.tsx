import React, { useState } from 'react';
import { 
    FormControl, 
    FormLabel, 
    RadioGroup, 
    FormControlLabel, 
    Radio, 
    Typography, 
    Paper
} from '@mui/material';
import { TTestType } from '../../../../enums/statistics.enums';

interface TTestTailSelectorProps {
    selectedTestType: TTestType;
    setSelectedTestType: React.Dispatch<React.SetStateAction<TTestType>>;
}

const TTestTailSelector: React.FC<TTestTailSelectorProps> = ({ 
    selectedTestType,
    setSelectedTestType
 }) => {
    const handleTestTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTestType = event.target.value as TTestType;
        setSelectedTestType(newTestType);
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <FormControl component="fieldset">
                <FormLabel component="legend">
                    <Typography variant="h6" gutterBottom>
                        Typ T-Testu
                    </Typography>
                </FormLabel>
                <RadioGroup
                    value={selectedTestType}
                    onChange={handleTestTypeChange}
                    name="t-test-type"
                >
                    <FormControlLabel
                        value={TTestType.ONE_TAILED_LEFT}
                        control={<Radio />}
                        label="Jednostranný test (levá hodnota > pravá hodnota)"
                    />
                    <FormControlLabel
                        value={TTestType.ONE_TAILED_RIGHT}
                        control={<Radio />}
                        label="Jednostranný test (pravá hodnota > levá hodnota)"
                    />
                    <FormControlLabel
                        value={TTestType.TWO_TAILED}
                        control={<Radio />}
                        label="Dvoustranný test"
                    />
                </RadioGroup>
            </FormControl>
        </Paper>
    );
};

export default TTestTailSelector;