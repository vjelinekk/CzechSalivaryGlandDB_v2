import React, { useState } from 'react';
import { 
    Paper, 
    Button, 
    Typography, 
    Box, 
    Alert,
    Card,
    CardContent,
    Grid,
    Chip
} from '@mui/material';
import { TTestType, TTestValue } from '../../../../enums/statistics.enums';
import { ITTestData } from '../../../../types/statistics.types';

interface TTestResult {
    pValue: number;
    tTestValue: number;
    alfa: number;
    type: 'one-sided-greater' | 'one-sided-less' | 'two-sided';
}

interface TTestValueCalculatorProps {
    selectedTestType: TTestType;
    selectedValue: TTestValue;
    tTestData: ITTestData;
}

const TTestValueCalculator: React.FC<TTestValueCalculatorProps> = ({
    selectedTestType,
    selectedValue,
    tTestData
}) => {
    const [tTestResult, setTTestResult] = useState<TTestResult | null>(null);
    const [isCalculating, setIsCalculating] = useState<boolean>(false);

    console.log('Selected Test Type:', selectedTestType);
    console.log('Selected Value:', selectedValue);
    console.log('T-Test Data:', tTestData);

    const getTestTypeString = (testType: TTestType): 'one-sided-greater' | 'one-sided-less' | 'two-sided' => {
        switch (testType) {
            case TTestType.ONE_TAILED_LEFT:
                return 'one-sided-less';
            case TTestType.ONE_TAILED_RIGHT:
                return 'one-sided-greater';
            case TTestType.TWO_TAILED:
                return 'two-sided';
            default:
                return 'two-sided';
        }
    };

    const handleTTestCalculation = async () => {
        setIsCalculating(true);
        
        // Mock calculation - replace with actual calculation later
        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate calculation time
            
            const mockResult: TTestResult = {
                pValue: Math.random() * 0.1, // Random p-value between 0 and 0.1
                tTestValue: Math.random() * 4 - 2, // Random t-value between -2 and 2
                alfa: 0.05,
                type: getTestTypeString(selectedTestType)
            };
            
            setTTestResult(mockResult);
            console.log('T-Test calculation completed:', mockResult);
        } catch (error) {
            console.error('Error calculating T-Test:', error);
        } finally {
            setIsCalculating(false);
        }
    };

    const isStatisticallySignificant = (result: TTestResult): boolean => {
        return result.pValue < result.alfa;
    };

    const getTestTypeLabel = (type: string): string => {
        switch (type) {
            case 'one-sided-greater':
                return 'Jednostranný test (pravá > levá)';
            case 'one-sided-less':
                return 'Jednostranný test (levá > pravá)';
            case 'two-sided':
                return 'Dvoustranný test';
            default:
                return 'Neznámý typ testu';
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                Výpočet T-Test
            </Typography>

            <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Vybraný typ testu: {getTestTypeLabel(getTestTypeString(selectedTestType))}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Vybraná hodnota: {selectedValue}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Počet pacientů - Skupina 1: {tTestData.group1.length}, Skupina 2: {tTestData.group2.length}
                </Typography>
            </Box>

            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleTTestCalculation}
                disabled={isCalculating}
                sx={{ mb: 3 }}
            >
                {isCalculating ? 'Probíhá výpočet...' : 'Vypočítat T-Test'}
            </Button>

            {tTestResult && (
                <Card sx={{ mt: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Výsledky T-Test
                        </Typography>
                        
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                    T-hodnota:
                                </Typography>
                                <Typography variant="h6">
                                    {tTestResult.tTestValue.toFixed(4)}
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                    P-hodnota:
                                </Typography>
                                <Typography variant="h6">
                                    {tTestResult.pValue.toFixed(6)}
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                    Hladina významnosti (α):
                                </Typography>
                                <Typography variant="h6">
                                    {tTestResult.alfa}
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                    Typ testu:
                                </Typography>
                                <Typography variant="body1">
                                    {getTestTypeLabel(tTestResult.type)}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 3 }}>
                            {isStatisticallySignificant(tTestResult) ? (
                                <Alert severity="success">
                                    <Typography variant="body1">
                                        <strong>Statisticky významný</strong> - P-hodnota ({tTestResult.pValue.toFixed(6)}) je menší než hladina významnosti α = {tTestResult.alfa}
                                    </Typography>
                                </Alert>
                            ) : (
                                <Alert severity="info">
                                    <Typography variant="body1">
                                        <strong>Statisticky nevýznamný</strong> - P-hodnota ({tTestResult.pValue.toFixed(6)}) je větší než hladina významnosti α = {tTestResult.alfa}
                                    </Typography>
                                </Alert>
                            )}
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <Chip 
                                label={isStatisticallySignificant(tTestResult) ? 'Významný' : 'Nevýznamný'}
                                color={isStatisticallySignificant(tTestResult) ? 'success' : 'default'}
                                variant="filled"
                            />
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Paper>
    );
};

export default TTestValueCalculator;