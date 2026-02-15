import React, { useEffect, useState } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    CircularProgress,
    Alert
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MLModelInfoDto } from '../../../../ipc/dtos/MLModelInfoDto';

const ModelInfoTab: React.FC = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(true);
    const [models, setModels] = useState<MLModelInfoDto[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchModels = async () => {
            try {
                setLoading(true);
                const modelInfo = await window.ml.getModelInfo();
                setModels(modelInfo);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch model information.');
            } finally {
                setLoading(false);
            }
        };

        fetchModels();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (models.length === 0) {
        return <Typography variant="body1" align="center">{t('Zatím nebyly natrénovány žádné modely.')}</Typography>;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{t('Typ modelu')}</TableCell>
                        <TableCell>{t('Algoritmus')}</TableCell>
                        <TableCell>{t('Datum trénování')}</TableCell>
                        <TableCell>{t('Přesnost (C-index)')}</TableCell>
                        <TableCell>{t('Pacienti / Události')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {models.map((model) => (
                        <TableRow key={model.model_path}>
                            <TableCell>{model.model_type === 'overall_survival' ? t('Celkové přežití') : t('Recidiva')}</TableCell>
                            <TableCell>{model.model_metadata.algorithm === 'rsf' ? 'Random Survival Forest' : 'Cox PH'}</TableCell>
                            <TableCell>{new Date(model.model_metadata.training_date).toLocaleString()}</TableCell>
                            <TableCell>{(model.model_metadata.c_index * 100).toFixed(1)}%</TableCell>
                            <TableCell>{model.model_metadata.n_samples} / {model.model_metadata.n_events}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ModelInfoTab;
