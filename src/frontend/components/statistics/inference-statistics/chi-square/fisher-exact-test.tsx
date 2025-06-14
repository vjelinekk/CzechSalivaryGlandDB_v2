import React, { useState, useEffect } from 'react'
import { Box, Typography, Grid, Paper, TextField, Button } from '@mui/material'
import CategoriesSelector from './categories-selector'
import { InferenceChiSquareCategories } from '../../../../enums/statistics.enums'
import { calculateFishersExact } from '../../../../utils/statistics/calculateFishersExact'

const FisherExactTest: React.FC = () => {
    const rows = 2
    const columns = 2
    // Initialize matrix with rows and columns for sums (rows+1, columns+1)
    const [matrix, setMatrix] = useState<number[][]>(initializeMatrix(2, 2))
    const [alpha, setAlpha] = useState<number | string>(5)
    // State for Chi-square test results
    const [testResults, setTestResults] = useState<{
        fisherTestResult: number | null
        isSignificant: boolean | null
        pValue: number | null
    }>({
        fisherTestResult: null,
        isSignificant: null,
        pValue: null,
    })
    // Flag indicating if the test has been performed
    const [testPerformed, setTestPerformed] = useState<boolean>(false)

    const [rowSelectedCategories, setRowSelectedCategories] = useState<
        Record<number, Record<InferenceChiSquareCategories, string[]>>
    >({})
    const [columnSelectedCategories, setColumnSelectedCategories] = useState<
        Record<number, Record<InferenceChiSquareCategories, string[]>>
    >({})

    // Function to initialize matrix with dimensions for sums
    function initializeMatrix(rows: number, columns: number): number[][] {
        // Create a matrix of size (rows+1) x (columns+1)
        const newMatrix: number[][] = []

        // Create data rows (0 to rows-1)
        for (let i = 0; i < rows; i++) {
            const row: number[] = []
            // Data columns (0 to columns-1)
            for (let j = 0; j < columns; j++) {
                row.push(0)
            }
            // Column for row sum
            row.push(0)
            newMatrix.push(row)
        }

        // Last row for column sums and total sum
        const sumRow: number[] = Array(columns + 1).fill(0)
        newMatrix.push(sumRow)

        return newMatrix
    }

    const updateSums = (matrix: number[][]): number[][] => {
        if (!matrix || matrix.length === 0) return matrix

        const updatedMatrix = [...matrix]
        const matrixRows = matrix.length - 1
        const matrixColumns = matrix[0]?.length - 1 || 0

        // Row sums
        for (let i = 0; i < matrixRows; i++) {
            let rowSum = 0
            for (let j = 0; j < matrixColumns; j++) {
                rowSum += updatedMatrix[i][j] || 0
            }
            updatedMatrix[i][matrixColumns] = rowSum
        }

        // Column sums
        for (let j = 0; j <= matrixColumns; j++) {
            let colSum = 0
            for (let i = 0; i < matrixRows; i++) {
                colSum += updatedMatrix[i][j] || 0
            }
            updatedMatrix[matrixRows][j] = colSum
        }

        return updatedMatrix
    }

    useEffect(() => {
        const fetchChiSquareData = async () => {
            const response = await window.api.getChiSquareData(
                rows,
                columns,
                rowSelectedCategories,
                columnSelectedCategories
            )

            // Update matrix with API response
            if (response && Array.isArray(response) && response.length > 0) {
                const responseMatrix = [...response]

                // Create new matrix with space for sums
                const newMatrix: number[][] = []

                // Copy data values from API
                for (let i = 0; i < rows; i++) {
                    const row: number[] = []
                    // Copy values from API
                    for (let j = 0; j < columns; j++) {
                        row.push(responseMatrix[i]?.[j] ?? 0)
                    }
                    // Add column for row sum
                    row.push(0)
                    newMatrix.push(row)
                }

                // Add row for column sums and total sum
                const sumRow: number[] = Array(columns + 1).fill(0)
                newMatrix.push(sumRow)

                // Update sums
                const updatedMatrix = updateSums(newMatrix)
                setMatrix(updatedMatrix)

                // Reset test results when data changes
                if (testPerformed) {
                    setTestPerformed(false)
                    setTestResults({
                        fisherTestResult: null,
                        isSignificant: null,
                        pValue: null,
                    })
                }
            }
        }

        fetchChiSquareData()
    }, [rowSelectedCategories, columnSelectedCategories, rows, columns])

    // Handle cell value changes
    const handleCellChange = (
        rowIndex: number,
        colIndex: number,
        value: string
    ) => {
        const numValue = value === '' ? 0 : Number(value)
        const newMatrix = [...matrix]
        newMatrix[rowIndex][colIndex] = isNaN(numValue) ? 0 : numValue

        const updatedMatrix = updateSums(newMatrix)
        setMatrix(updatedMatrix)

        if (testPerformed) {
            setTestPerformed(false)
            setTestResults({
                fisherTestResult: null,
                isSignificant: null,
                pValue: null,
            })
        }
    }

    // Handle alpha value changes
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

        if (testPerformed) {
            setTestPerformed(false)
            setTestResults({
                fisherTestResult: null,
                isSignificant: null,
                pValue: null,
            })
        }
    }

    const handleCalculateFisherExactTest = () => {
        const alphaValue = typeof alpha === 'number' ? alpha / 100 : 0.05

        const { fisherTestResult, isSignificant, pValue } =
            calculateFishersExact(matrix, alphaValue)

        console.log('Fisher Exact Test Results:', {
            fisherTestResult,
            isSignificant,
            pValue,
        })

        setTestResults({
            fisherTestResult,
            isSignificant,
            pValue,
        })

        setTestPerformed(true)
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Fisherův exaktní test
            </Typography>

            <CategoriesSelector
                title="Vyberte kategorie pro řádky"
                numberOfCategories={rows}
                setSelectedCategories={setRowSelectedCategories}
            />
            <CategoriesSelector
                title="Vyberte kategorie pro sloupce"
                numberOfCategories={columns}
                setSelectedCategories={setColumnSelectedCategories}
            />

            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Kontingenční matice
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Grid
                        container
                        spacing={1}
                        sx={{ maxWidth: '100%', overflow: 'auto' }}
                    >
                        <Grid container item key="column-headers" spacing={1}>
                            <Grid item>
                                <Box
                                    sx={{
                                        width: '100px',
                                        height: '56px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {/* Empty cell */}
                                </Box>
                            </Grid>

                            {/* Column labels */}
                            {Array.from({ length: columns }).map(
                                (_, colIndex) => (
                                    <Grid
                                        item
                                        key={`column-header-${colIndex}`}
                                    >
                                        <Box
                                            sx={{
                                                width: '100px',
                                                height: '56px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold',
                                                borderBottom:
                                                    '1px solid rgba(0, 0, 0, 0.12)',
                                            }}
                                        >
                                            Kategorie {colIndex + 1}
                                        </Box>
                                    </Grid>
                                )
                            )}

                            <Grid item key="row-sum-header">
                                <Box
                                    sx={{
                                        width: '100px',
                                        height: '56px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                        borderBottom:
                                            '1px solid rgba(0, 0, 0, 0.12)',
                                    }}
                                >
                                    Součet
                                </Box>
                            </Grid>
                        </Grid>

                        {matrix
                            .slice(0, Math.min(rows, matrix.length - 1))
                            .map((row, rowIndex) => (
                                <Grid
                                    container
                                    item
                                    key={`row-${rowIndex}`}
                                    spacing={1}
                                >
                                    <Grid item>
                                        <Box
                                            sx={{
                                                width: '100px',
                                                height: '56px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold',
                                                borderRight:
                                                    '1px solid rgba(0, 0, 0, 0.12)',
                                            }}
                                        >
                                            Kategorie {rowIndex + 1}
                                        </Box>
                                    </Grid>

                                    {row
                                        .slice(0, columns)
                                        .map((cell, colIndex) => (
                                            <Grid
                                                item
                                                key={`cell-${rowIndex}-${colIndex}`}
                                            >
                                                <TextField
                                                    type="number"
                                                    disabled={true}
                                                    variant="outlined"
                                                    size="small"
                                                    value={
                                                        cell === 0 ? '' : cell
                                                    }
                                                    onChange={(e) =>
                                                        handleCellChange(
                                                            rowIndex,
                                                            colIndex,
                                                            e.target.value
                                                        )
                                                    }
                                                    sx={{ width: '100px' }}
                                                    InputProps={{
                                                        inputProps: { min: 0 },
                                                    }}
                                                />
                                            </Grid>
                                        ))}

                                    <Grid item key={`row-sum-${rowIndex}`}>
                                        <TextField
                                            type="number"
                                            disabled={true}
                                            variant="outlined"
                                            size="small"
                                            value={
                                                row[
                                                    Math.min(
                                                        columns,
                                                        row.length - 1
                                                    )
                                                ] || 0
                                            }
                                            sx={{
                                                width: '100px',
                                                backgroundColor:
                                                    'rgba(0, 0, 0, 0.05)',
                                                '& .MuiInputBase-input.Mui-disabled':
                                                    {
                                                        WebkitTextFillColor:
                                                            '#000000',
                                                        fontWeight: 'bold',
                                                    },
                                            }}
                                            InputProps={{
                                                inputProps: { min: 0 },
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            ))}

                        <Grid container item key="column-sums-row" spacing={1}>
                            <Grid item>
                                <Box
                                    sx={{
                                        width: '100px',
                                        height: '56px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                        borderTop:
                                            '1px solid rgba(0, 0, 0, 0.12)',
                                        borderRight:
                                            '1px solid rgba(0, 0, 0, 0.12)',
                                    }}
                                >
                                    Součet
                                </Box>
                            </Grid>

                            {matrix[matrix.length - 1]
                                ?.slice(0, columns)
                                .map((sum, colIndex) => (
                                    <Grid item key={`column-sum-${colIndex}`}>
                                        <TextField
                                            type="number"
                                            disabled={true}
                                            variant="outlined"
                                            size="small"
                                            value={sum}
                                            sx={{
                                                width: '100px',
                                                backgroundColor:
                                                    'rgba(0, 0, 0, 0.05)',
                                                borderTop:
                                                    '1px solid rgba(0, 0, 0, 0.12)',
                                                '& .MuiInputBase-input.Mui-disabled':
                                                    {
                                                        WebkitTextFillColor:
                                                            '#000000',
                                                        fontWeight: 'bold',
                                                    },
                                            }}
                                        />
                                    </Grid>
                                ))}

                            <Grid item>
                                <TextField
                                    type="number"
                                    disabled={true}
                                    variant="outlined"
                                    size="small"
                                    value={
                                        matrix[matrix.length - 1]?.[
                                            matrix[0]?.length - 1
                                        ] || 0
                                    }
                                    sx={{
                                        width: '100px',
                                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                        borderTop:
                                            '1px solid rgba(0, 0, 0, 0.12)',
                                        borderLeft:
                                            '1px solid rgba(0, 0, 0, 0.12)',
                                        '& .MuiInputBase-input.Mui-disabled': {
                                            WebkitTextFillColor: '#000000',
                                            fontWeight: 'bold',
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>

                <Box
                    sx={{
                        mt: 3,
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'center',
                        gap: 2,
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

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ minWidth: '100px' }}
                        onClick={handleCalculateFisherExactTest}
                    >
                        Vypočítat Chi-kvadrát
                    </Button>
                </Box>
            </Paper>

            {testPerformed && (
                <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Výsledky Fisherova testu
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    p: 2,
                                    mb: 2,
                                    borderRadius: 1,
                                    bgcolor: testResults.isSignificant
                                        ? 'rgba(76, 175, 80, 0.1)'
                                        : 'rgba(244, 67, 54, 0.1)',
                                    border: testResults.isSignificant
                                        ? '1px solid rgba(76, 175, 80, 0.5)'
                                        : '1px solid rgba(244, 67, 54, 0.5)',
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: testResults.isSignificant
                                            ? '#1b5e20'
                                            : '#b71c1c',
                                    }}
                                >
                                    {testResults.isSignificant
                                        ? 'Výsledek je statisticky signifikantní'
                                        : 'Výsledek není statisticky signifikantní'}
                                </Typography>
                                <Typography variant="body2">
                                    Na hladině významnosti{' '}
                                    {typeof alpha === 'number' ? alpha : 5}%.
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle2" gutterBottom>
                                Hodnota Fisherova testu:
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontWeight: 'bold' }}
                            >
                                {testResults.fisherTestResult?.toFixed(4)}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle2" gutterBottom>
                                P-hodnota:
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontWeight: 'bold' }}
                            >
                                {testResults.pValue &&
                                testResults.pValue < 0.0001
                                    ? '<0.0001'
                                    : testResults.pValue?.toFixed(4)}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Typography variant="body2">
                                {testResults.isSignificant
                                    ? `P-hodnota (${testResults.pValue?.toFixed(4)}) je menší nebo rovna hladině významnosti (${alpha}), proto zamítáme nulovou hypotézu.`
                                    : `P-hodnota (${testResults.pValue?.toFixed(4)}) je větší než hladina významnosti (${alpha}), proto nelze zamítnout nulovou hypotézu.`}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </Box>
    )
}

export default FisherExactTest
