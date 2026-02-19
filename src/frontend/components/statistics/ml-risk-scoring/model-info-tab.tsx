import React, { useEffect, useState } from 'react'
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Alert,
    Radio,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslation } from 'react-i18next'
import { MLModelInfoDto } from '../../../../ipc/dtos/MLModelInfoDto'

const ModelInfoTab: React.FC = () => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState<boolean>(true)
    const [models, setModels] = useState<MLModelInfoDto[]>([])
    const [error, setError] = useState<string | null>(null)

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [modelToDelete, setModelToDelete] = useState<number | null>(null)

    const fetchModels = async () => {
        try {
            setLoading(true)
            const modelInfo = await window.ml.getModelInfo()
            setModels(modelInfo)
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
                return
            }

            setError('Failed to fetch model information.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchModels()
    }, [])

    const handleSetActive = async (id: number) => {
        try {
            await window.ml.setActiveModel(id)
            await fetchModels() // Refresh list to show new active status
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
                return
            }

            setError('Failed to set active model.')
        }
    }

    const handleDeleteClick = (id: number) => {
        setModelToDelete(id)
        setDeleteDialogOpen(true)
    }

    const confirmDelete = async () => {
        if (modelToDelete === null) return
        try {
            await window.ml.deleteModel(modelToDelete)
            setDeleteDialogOpen(false)
            setModelToDelete(null)
            await fetchModels()
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
                return
            }

            setError('Failed to delete model.')
        }
    }

    if (loading && models.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box>
            {error && (
                <Alert
                    severity="error"
                    sx={{ mb: 2 }}
                    onClose={() => setError(null)}
                >
                    {error}
                </Alert>
            )}

            <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                {t('Aktivní')}
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                {t('Typ modelu')}
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                {t('Algoritmus')}
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                {t('Datum trénování')}
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                {t('C-index')}
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                {t('Vzorek')}
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                {t('Akce')}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {models.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    align="center"
                                    sx={{ py: 3 }}
                                >
                                    {t(
                                        'Zatím nebyly natrénovány žádné modely.'
                                    )}
                                </TableCell>
                            </TableRow>
                        ) : (
                            models.map((model) => (
                                <TableRow
                                    key={model.id}
                                    hover
                                    selected={model.is_active}
                                >
                                    <TableCell padding="checkbox">
                                        <Tooltip
                                            title={t(
                                                'Nastavit jako aktivní pro predikce'
                                            )}
                                        >
                                            <Radio
                                                checked={model.is_active}
                                                onChange={() =>
                                                    handleSetActive(model.id)
                                                }
                                                size="small"
                                            />
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        {model.model_type === 'overall_survival'
                                            ? t('Přežití')
                                            : t('Recidiva')}
                                    </TableCell>
                                    <TableCell>
                                        {model.model_metadata.algorithm ===
                                        'rsf'
                                            ? 'RS Forest'
                                            : 'Cox PH'}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            model.model_metadata.training_date
                                        ).toLocaleString()}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'medium' }}>
                                        {(
                                            model.model_metadata.c_index * 100
                                        ).toFixed(1)}
                                        %
                                    </TableCell>
                                    <TableCell>
                                        {model.model_metadata.n_samples} /{' '}
                                        {model.model_metadata.n_events}
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip
                                            title={t('Smazat model i soubor')}
                                        >
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() =>
                                                    handleDeleteClick(model.id)
                                                }
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>{t('Smazat ML model?')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t(
                            'Tato akce trvale smaže metadata modelu z databáze i fyzický soubor .joblib z disku. Tuto akci nelze vzít zpět.'
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setDeleteDialogOpen(false)}
                        color="primary"
                    >
                        {t('Zrušit')}
                    </Button>
                    <Button
                        onClick={confirmDelete}
                        color="error"
                        autoFocus
                        variant="contained"
                    >
                        {t('Smazat')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default ModelInfoTab
