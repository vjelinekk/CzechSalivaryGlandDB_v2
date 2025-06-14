import React, { useState } from 'react'
import {
    Paper,
    Button,
    Typography,
    Box,
    Alert,
    Card,
    CardContent,
    Grid,
    Chip,
    TextField,
} from '@mui/material'
import {
    NonParametricTestType,
    NonParametricTestValue,
} from '../../../../enums/statistics.enums'
import {
    NonParametricTestData,
    NonParametricTestResult,
} from '../../../../types/statistics.types'

interface Props {
    selectedTestType: NonParametricTestType
    selectedValue: NonParametricTestValue
    nonParametricTestData: NonParametricTestData
    calculateFunction: (
        testType: NonParametricTestType,
        value: NonParametricTestValue,
        data: NonParametricTestData,
        alpha: number
    ) => NonParametricTestResult
    title: string
    testName: string
}

const NonParametricTestCalculator: React.FC<Props> = ({
    selectedTestType,
    selectedValue,
    nonParametricTestData,
    calculateFunction,
    title,
    testName,
}) => {
    const [testResult, setTestResult] =
        useState<NonParametricTestResult | null>(null)
    const [isCalculating, setIsCalculating] = useState<boolean>(false)
    const [alpha, setAlpha] = useState<number | string>(5)

    const handleAlphaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === '') {
            setAlpha('')
            return
        }

        const value = parseInt(event.target.value)
        if (isNaN(value) || value < 1 || value > 99) {
            setAlpha(5)
            return
        }

        setAlpha(value)
    }

    const handleTTestCalculation = async () => {
        setIsCalculating(true)
        const alphaValue = typeof alpha === 'number' ? alpha / 100 : 0.05

        const result = calculateFunction(
            selectedTestType,
            selectedValue,
            nonParametricTestData,
            alphaValue
        )

        setTestResult(result)
        setIsCalculating(false)
    }

    const getTestTypeLabel = (type: NonParametricTestType): string => {
        switch (type) {
            case NonParametricTestType.ONE_TAILED_RIGHT:
                return 'Jednostranný test (pravá > levá)'
            case NonParametricTestType.ONE_TAILED_LEFT:
                return 'Jednostranný test (levá > pravá)'
            case NonParametricTestType.TWO_TAILED:
                return 'Dvoustranný test'
            default:
                return 'Neznámý typ testu'
        }
    }

    const getSelectedValueLabel = (
        value: NonParametricTestValue
    ): string => {
        switch (value) {
            case NonParametricTestValue.AGE:
                return 'Věk pacienta'
            case NonParametricTestValue.PACK_YEAR:
                return 'Počet balíčko roků'
            case NonParametricTestValue.TUMOR_SIZE:
                return 'Velikost nádoru (mm)'
            default:
                return 'Neznámá hodnota'
        }
    }

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>

            <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Vybraný typ testu: {getTestTypeLabel(selectedTestType)}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Vybraná hodnota: {getSelectedValueLabel(selectedValue)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Počet pacientů - Skupina 1:{' '}
                    {nonParametricTestData.group1.length}, Skupina 2:{' '}
                    {nonParametricTestData.group2.length}
                </Typography>
            </Box>

            <Box
                sx={{
                    mt: 3,
                    display: 'flex',
                    justifyContent: 'left',
                    alignItems: 'center',
                    gap: 2,
                    mb: 3,
                }}
            >
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    Hladina významnosti:
                </Typography>
                <TextField
                    type="number"
                    variant="outlined"
                    size="small"
                    value={alpha}
                    onChange={handleAlphaChange}
                    inputProps={{
                        step: 1,
                        min: 1,
                        max: 99,
                        style: { textAlign: 'center' },
                    }}
                    sx={{ width: '100px' }}
                />
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    %
                </Typography>
            </Box>

            <Button
                variant="contained"
                color="primary"
                onClick={handleTTestCalculation}
                disabled={isCalculating}
                sx={{ mb: 3 }}
            >
                {isCalculating ? 'Probíhá výpočet...' : `Vypočítat ${testName}`}
            </Button>

            {testResult && (
                <Card sx={{ mt: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Výsledky {testName}u
                        </Typography>

                        {/* Edge case handling for invalid results */}
                        {isNaN(testResult.pValue) ||
                            isNaN(testResult.testValue) ||
                            testResult.pValue === null ||
                            testResult.testValue === null ? (
                            <Alert severity="warning" sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    Výpočet {testName}u se nezdařil.
                                    Zkontrolujte, zda mají obě skupiny dostatek
                                    dat (alespoň 2 hodnoty) a že rozptyl není
                                    nulový.
                                    <br />
                                    Pokud je rozptyl v obou skupinách nulový,
                                    nebo je příliš málo dat, {testName} nelze
                                    vypočítat.
                                </Typography>
                            </Alert>
                        ) : (
                            <>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Hodnota testu:
                                        </Typography>
                                        <Typography variant="h6">
                                            {testResult.testValue.toFixed(4)}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            P-hodnota:
                                        </Typography>
                                        <Typography variant="h6">
                                            {testResult.pValue.toFixed(6)}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Hladina významnosti (α):
                                        </Typography>
                                        <Typography variant="h6">
                                            {testResult.alpha.toFixed(2)}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Typ testu:
                                        </Typography>
                                        <Typography variant="body1">
                                            {getTestTypeLabel(testResult.type)}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Box sx={{ mt: 3 }}>
                                    {testResult.isStatisticallySignificant ? (
                                        <Alert severity="success">
                                            <Typography variant="body1">
                                                <strong>
                                                    Statisticky významný
                                                </strong>{' '}
                                                - P-hodnota (
                                                {testResult.pValue.toFixed(6)})
                                                je menší než hladina významnosti
                                                α = {testResult.alpha}
                                            </Typography>
                                        </Alert>
                                    ) : (
                                        <Alert severity="info">
                                            <Typography variant="body1">
                                                <strong>
                                                    Statisticky nevýznamný
                                                </strong>{' '}
                                                - P-hodnota (
                                                {testResult.pValue.toFixed(6)})
                                                je větší než hladina významnosti
                                                α = {testResult.alpha}
                                            </Typography>
                                        </Alert>
                                    )}
                                </Box>

                                <Box sx={{ mt: 2 }}>
                                    <Chip
                                        label={
                                            testResult.isStatisticallySignificant
                                                ? 'Významný'
                                                : 'Nevýznamný'
                                        }
                                        color={
                                            testResult.isStatisticallySignificant
                                                ? 'success'
                                                : 'default'
                                        }
                                        variant="filled"
                                    />
                                </Box>
                            </>
                        )}
                    </CardContent>
                </Card>
            )}
        </Paper>
    )
}

export default NonParametricTestCalculator
