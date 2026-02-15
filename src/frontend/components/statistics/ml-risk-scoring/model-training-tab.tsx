import React, { useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    Typography,
    Alert
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MLTrainingResultDto } from '../../../../ipc/dtos/MLTrainingResultDto';

const ModelTrainingTab: React.FC = () => {
    const { t } = useTranslation();
    const [modelType, setModelType] = useState<'overall_survival' | 'recurrence'>('overall_survival');
    const [algorithm, setAlgorithm] = useState<'rsf' | 'coxph'>('rsf');
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<MLTrainingResultDto | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleTrain = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const trainingResult = await window.ml.trainModel(modelType, algorithm);
            setResult(trainingResult);
        } catch (err: any) {
            setError(err.message || 'An error occurred during training.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    {t('Konfigurace trénování modelu')}
                </Typography>
                
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t('Cílová proměnná')}</FormLabel>
                            <RadioGroup
                                aria-label="model-type"
                                name="model-type"
                                value={modelType}
                                onChange={(e) => setModelType(e.target.value as 'overall_survival' | 'recurrence')}
                            >
                                <FormControlLabel value="overall_survival" control={<Radio />} label={t('Celkové přežití')} />
                                <FormControlLabel value="recurrence" control={<Radio />} label={t('Recidiva')} />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t('Algoritmus')}</FormLabel>
                            <RadioGroup
                                aria-label="algorithm"
                                name="algorithm"
                                value={algorithm}
                                onChange={(e) => setAlgorithm(e.target.value as 'rsf' | 'coxph')}
                            >
                                <FormControlLabel 
                                    value="rsf" 
                                    control={<Radio />} 
                                    label={t('Random Survival Forest')} 
                                />
                                <FormControlLabel 
                                    value="coxph" 
                                    control={<Radio />} 
                                    label={t('Cox Proportional Hazards')} 
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleTrain} 
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={20} color="inherit" />}
                    >
                        {loading ? t('Trénování...') : t('Trénovat model')}
                    </Button>
                </Box>
            </Paper>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {result && (
                <Paper elevation={1} sx={{ p: 3, bgcolor: '#f1f8e9' }}>
                    <Typography variant="h6" gutterBottom color="primary">
                        {t('Výsledky trénování')}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={3}>
                            <Typography variant="subtitle2" color="textSecondary">{t('C-index (Přesnost)')}</Typography>
                            <Typography variant="h5">{(result.c_index * 100).toFixed(1)}%</Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Typography variant="subtitle2" color="textSecondary">{t('Počet pacientů')}</Typography>
                            <Typography variant="h5">{result.n_samples}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Typography variant="subtitle2" color="textSecondary">{t('Počet událostí')}</Typography>
                            <Typography variant="h5">{result.n_events}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Typography variant="subtitle2" color="textSecondary">{t('Datum trénování')}</Typography>
                            <Typography variant="body1">{new Date(result.training_date).toLocaleString()}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </Box>
    );
};

export default ModelTrainingTab;
