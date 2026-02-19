import React, { useState, useEffect } from 'react'
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    LinearProgress,
    Typography,
    Alert,
    Tooltip,
    IconButton,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import PsychologyIcon from '@mui/icons-material/Psychology'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { useTranslation } from 'react-i18next'
import { PatientType } from '../types'
import { MLPredictionResultDto } from '../../ipc/dtos/MLPredictionResultDto'
import { MLAlgorithm, MLModelType } from '../types/ml'
import { keyframes } from '@emotion/react'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

interface PatientRiskCardProps {
    patient: PatientType
    disabled?: boolean
}

const PatientRiskCard: React.FC<PatientRiskCardProps> = ({
    patient,
    disabled,
}) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState<boolean>(false)
    const [result, setResult] = useState<MLPredictionResultDto | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [modelType, setModelType] = useState<MLModelType>('overall_survival')
    const [algorithm, setAlgorithm] = useState<MLAlgorithm>('rsf')
    const [expand, setExpand] = useState<boolean>(false)

    // Only show for malignant patients
    const isMalignant =
        patient.form_type && [1, 2, 3].includes(patient.form_type as number)

    // Load saved prediction when expanding or changing config
    useEffect(() => {
        const loadSaved = async () => {
            if (expand && isMalignant && patient.id) {
                setLoading(true)
                setResult(null)
                setError(null)

                const startTime = Date.now()
                const minDelay = 400

                try {
                    const saved = await window.ml.getSavedPrediction(
                        patient.id,
                        modelType,
                        algorithm
                    )

                    const elapsedTime = Date.now() - startTime
                    if (elapsedTime < minDelay) {
                        await new Promise((resolve) =>
                            setTimeout(resolve, minDelay - elapsedTime)
                        )
                    }

                    setResult(saved)
                } catch (err) {
                    console.error('Failed to load saved prediction:', err)
                } finally {
                    setLoading(false)
                }
            }
        }
        loadSaved()
    }, [expand, modelType, algorithm, patient.id])

    if (!isMalignant) {
        return null
    }

    const handleCalculate = async () => {
        if (loading) return
        setLoading(true)
        setError(null)
        setResult(null)

        try {
            const prediction = await window.ml.calculateRiskScore(
                patient,
                modelType,
                algorithm,
                true
            )
            setResult(prediction)
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError(t('Nepodařilo se vypočítat riziko.'))
            }
            setResult(null)
        } finally {
            setLoading(false)
        }
    }

    const handleModelTypeChange = (
        _: unknown,
        nextType: MLModelType | null
    ) => {
        if (nextType && nextType !== modelType && !loading) {
            setModelType(nextType)
        }
    }

    const handleAlgorithmChange = (_: unknown, nextAlg: MLAlgorithm | null) => {
        if (nextAlg && nextAlg !== algorithm && !loading) {
            setAlgorithm(nextAlg)
        }
    }

    const getRiskColor = (score: number) => {
        if (score < 0.3) return 'success.main'
        if (score < 0.7) return 'warning.main'
        return 'error.main'
    }

    const getRiskLabel = (score: number) => {
        if (score < 0.3) return t('Nízké riziko')
        if (score < 0.7) return t('Střední riziko')
        return t('Vysoké riziko')
    }

    const formatDate = (isoString?: string) => {
        if (!isoString) return ''
        return new Date(isoString).toLocaleDateString()
    }

    return (
        <Card
            id="mlRiskCard"
            sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
                alignItems: expand ? 'flex-start' : 'center',
                padding: 1,
                gap: 1,
                width: expand ? '450px' : 'fit-content',
                minHeight: expand ? '180px' : 'auto',
                boxShadow: 3,
                border: 1,
                borderColor: 'grey.300',
                animation: expand ? `${fadeIn} 0.2s ease` : 'none',
                cursor: loading ? 'wait' : 'default',
                '& .MuiButton-root, & .MuiIconButton-root, & .MuiToggleButton-root':
                    {
                        margin: '0 !important',
                        boxShadow: 'none !important',
                        textTransform: 'none',
                        transition: 'none !important',
                        '&:active': {
                            transform: 'none !important',
                        },
                    },
            }}
        >
            <Button
                onClick={() => !loading && setExpand(!expand)}
                sx={{
                    minWidth: 0,
                    width: '32px !important',
                    height: '32px !important',
                    padding: '0 !important',
                    pointerEvents: loading ? 'none' : 'auto',
                    opacity: loading ? 0.7 : 1,
                }}
                disableRipple
                variant={!expand ? 'contained' : 'text'}
                color="primary"
            >
                {expand ? (
                    <ChevronRightIcon />
                ) : (
                    <PsychologyIcon sx={{ fontSize: '1.2rem' }} />
                )}
            </Button>

            {expand && (
                <Box
                    sx={{
                        width: '100%',
                        mr: 1,
                        pointerEvents: loading ? 'none' : 'auto',
                    }}
                >
                    <Box sx={{ p: 1 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, mb: 1 }}
                        >
                            {t('Analýza rizika (ML)')}
                        </Typography>

                        <Box sx={{ mb: 1.5 }}>
                            <ToggleButtonGroup
                                value={modelType}
                                exclusive
                                onChange={handleModelTypeChange}
                                size="small"
                                fullWidth
                                color="primary"
                            >
                                <ToggleButton
                                    value="overall_survival"
                                    disableRipple
                                    sx={{ padding: '4px 7px !important' }}
                                >
                                    {t('Přežití')}
                                </ToggleButton>
                                <ToggleButton
                                    value="recurrence"
                                    disableRipple
                                    sx={{ padding: '4px 7px !important' }}
                                >
                                    {t('Recidiva')}
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        <Box sx={{ mb: 1.5 }}>
                            <ToggleButtonGroup
                                value={algorithm}
                                exclusive
                                onChange={handleAlgorithmChange}
                                size="small"
                                fullWidth
                                color="primary"
                            >
                                <ToggleButton
                                    value="rsf"
                                    disableRipple
                                    sx={{ padding: '4px 7px !important' }}
                                >
                                    Random Survival Forest
                                </ToggleButton>
                                <ToggleButton
                                    value="coxph"
                                    disableRipple
                                    sx={{ padding: '4px 7px !important' }}
                                >
                                    Cox PH
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                minHeight: '40px',
                                alignItems: 'center',
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} />
                            ) : (
                                !result &&
                                !error && (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleCalculate}
                                        disabled={disabled}
                                        disableRipple
                                        sx={{
                                            px: 3,
                                            padding: '6px 16px !important',
                                        }}
                                    >
                                        {t('Vypočítat riziko')}
                                    </Button>
                                )
                            )}
                        </Box>

                        {error && !loading && (
                            <Alert
                                severity="error"
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => setError(null)}
                                        disableRipple
                                        sx={{ padding: '2px !important' }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{
                                    mb: 1,
                                    fontSize: '0.8rem',
                                    '& .MuiAlert-action': {
                                        padding: 0,
                                        alignItems: 'center',
                                    },
                                }}
                            >
                                {error}
                            </Alert>
                        )}
                    </Box>

                    {result && !loading && (
                        <Box sx={{ animation: `${fadeIn} 0.3s ease` }}>
                            <Divider />
                            <CardContent
                                sx={{ p: 2, '&:last-child': { pb: 2 } }}
                            >
                                <Grid container spacing={2}>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={4}
                                        sx={{ textAlign: 'center' }}
                                    >
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                display: 'inline-flex',
                                            }}
                                        >
                                            <CircularProgress
                                                variant="determinate"
                                                value={result.risk_score * 100}
                                                size={70}
                                                thickness={5}
                                                sx={{
                                                    color: getRiskColor(
                                                        result.risk_score
                                                    ),
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    top: 0,
                                                    left: 0,
                                                    bottom: 0,
                                                    right: 0,
                                                    position: 'absolute',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    fontWeight="bold"
                                                >
                                                    {Math.round(
                                                        result.risk_score * 100
                                                    )}
                                                    %
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Typography
                                            variant="caption"
                                            display="block"
                                            fontWeight="medium"
                                        >
                                            {getRiskLabel(result.risk_score)}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={8}>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{
                                                mb: 0.5,
                                                display: 'block',
                                                fontWeight: 600,
                                            }}
                                        >
                                            {modelType === 'overall_survival'
                                                ? t('Pravděpodobnost přežití')
                                                : t(
                                                      'Pravděpodobnost bez recidivy'
                                                  )}
                                        </Typography>
                                        {[
                                            {
                                                label: '1 rok',
                                                value:
                                                    modelType ===
                                                    'overall_survival'
                                                        ? result.survival_probability_1year
                                                        : result.recurrence_free_probability_1year,
                                            },
                                            {
                                                label: '3 roky',
                                                value:
                                                    modelType ===
                                                    'overall_survival'
                                                        ? result.survival_probability_3year
                                                        : result.recurrence_free_probability_3year,
                                            },
                                            {
                                                label: '5 let',
                                                value:
                                                    modelType ===
                                                    'overall_survival'
                                                        ? result.survival_probability_5year
                                                        : result.recurrence_free_probability_5year,
                                            },
                                        ].map((item) => (
                                            <Box
                                                key={item.label}
                                                sx={{ mb: 0.5 }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'space-between',
                                                    }}
                                                >
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            fontSize: '0.7rem',
                                                        }}
                                                    >
                                                        {item.label}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        fontWeight="bold"
                                                        sx={{
                                                            fontSize: '0.7rem',
                                                        }}
                                                    >
                                                        {Math.round(
                                                            (item.value || 0) *
                                                                100
                                                        )}
                                                        %
                                                    </Typography>
                                                </Box>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={
                                                        (item.value || 0) * 100
                                                    }
                                                    sx={{
                                                        height: 3,
                                                        borderRadius: 2,
                                                    }}
                                                />
                                            </Box>
                                        ))}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Divider sx={{ mb: 1 }} />
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                mb: 0.5,
                                            }}
                                        >
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{
                                                    mr: 0.5,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {t('Hlavní rizikové faktory')}
                                            </Typography>
                                            <Tooltip
                                                title={t(
                                                    'Faktory, které nejvíce přispěly k tomuto výsledku'
                                                )}
                                            >
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        padding: '0 !important',
                                                    }}
                                                >
                                                    <InfoIcon
                                                        sx={{
                                                            fontSize: '0.8rem',
                                                        }}
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                        {result.top_risk_factors &&
                                        result.top_risk_factors.length > 0 ? (
                                            <Grid container spacing={1}>
                                                {result.top_risk_factors.map(
                                                    (factor, index) => (
                                                        <Grid
                                                            item
                                                            xs={4}
                                                            key={index}
                                                        >
                                                            <Typography
                                                                variant="caption"
                                                                noWrap
                                                                display="block"
                                                                title={
                                                                    factor.feature
                                                                }
                                                                sx={{
                                                                    fontSize:
                                                                        '0.65rem',
                                                                }}
                                                            >
                                                                {t(
                                                                    factor.feature
                                                                ) ||
                                                                    factor.feature}
                                                            </Typography>
                                                            <LinearProgress
                                                                variant="determinate"
                                                                value={Math.min(
                                                                    factor.importance *
                                                                        100,
                                                                    100
                                                                )}
                                                                color="secondary"
                                                                sx={{
                                                                    height: 2,
                                                                    mt: 0.1,
                                                                }}
                                                            />
                                                        </Grid>
                                                    )
                                                )}
                                            </Grid>
                                        ) : (
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{ fontSize: '0.7rem' }}
                                            >
                                                {t(
                                                    'Žádné faktory nebyly identifikovány.'
                                                )}
                                            </Typography>
                                        )}
                                    </Grid>
                                </Grid>

                                <Box
                                    sx={{
                                        mt: 1.5,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.65rem',
                                                color: 'text.disabled',
                                            }}
                                        >
                                            {t('Vypočteno')}:{' '}
                                            {formatDate(
                                                result.calculation_date
                                            )}
                                        </Typography>
                                        {result.is_stale && (
                                            <Tooltip
                                                title={t(
                                                    'Tento výsledek pochází ze starší verze modelu.'
                                                )}
                                            >
                                                <WarningAmberIcon
                                                    sx={{
                                                        fontSize: '0.9rem',
                                                        color: 'warning.main',
                                                    }}
                                                />
                                            </Tooltip>
                                        )}
                                    </Box>
                                    <Button
                                        size="small"
                                        variant="text"
                                        onClick={handleCalculate}
                                        disableRipple
                                        sx={{
                                            fontSize: '0.65rem',
                                            minWidth: 0,
                                            p: '4px 8px !important',
                                        }}
                                    >
                                        {t('Přepočítat')}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Box>
                    )}
                </Box>
            )}
        </Card>
    )
}

export default PatientRiskCard
