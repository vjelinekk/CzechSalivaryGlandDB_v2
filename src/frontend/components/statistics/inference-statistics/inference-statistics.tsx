import React, { useState } from 'react'
import {
    Box,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Paper,
    Container,
    Divider,
} from '@mui/material'
import ChiSquare from './chi-square/chi-square-test'
import FisherExactTest from './chi-square/fisher-exact-test'

// Define the available statistical tests
type StatisticalTest = 'chi-square' | 'fisher-exact' | 't-test' | 'mann-whitney'

const InferenceStatistics: React.FC = () => {
    const [selectedTest, setSelectedTest] =
        useState<StatisticalTest>('chi-square')

    const handleTestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTest(event.target.value as StatisticalTest)
    }

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Inferenční Statistika
                </Typography>

                <Box sx={{ mt: 3, mb: 4 }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">
                            Zvolte statistický test:
                        </FormLabel>
                        <RadioGroup
                            row
                            value={selectedTest}
                            onChange={handleTestChange}
                            name="statistical-test-group"
                        >
                            <FormControlLabel
                                value="chi-square"
                                control={<Radio />}
                                label="Chi-kvadrát test"
                            />
                            <FormControlLabel
                                value="fisher-exact"
                                control={<Radio />}
                                label="Fisherův exaktní test"
                            />
                            <FormControlLabel
                                value="t-test"
                                control={<Radio />}
                                label="t-test"
                            />
                            <FormControlLabel
                                value="mann-whitney"
                                control={<Radio />}
                                label="Mann-Whitney U test"
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Content based on selected test */}
                <Box sx={{ mt: 3 }}>
                    {selectedTest === 'chi-square' && <ChiSquare />}
                    {selectedTest === 'fisher-exact' && <FisherExactTest />}
                    {selectedTest === 't-test' && (
                        <Typography variant="h6">
                            t-test - implementace bude přidána
                        </Typography>
                    )}
                    {selectedTest === 'mann-whitney' && (
                        <Typography variant="h6">
                            Mann-Whitney U test - implementace bude přidána
                        </Typography>
                    )}
                </Box>
            </Paper>
        </Container>
    )
}

export default InferenceStatistics
