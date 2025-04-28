import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

const LoadBackUpButton: React.FC = () => {
    const { t } = useTranslation()
    const [openLoadBackUpDialog, setOpenLoadBackUpDialog] =
        React.useState(false)

    const handleLoadBackUpConfirm = async () => {
        setOpenLoadBackUpDialog(false)
        await window.backUp.loadBackUp()
        window.location.reload()
    }

    return (
        <>
            <button onClick={() => setOpenLoadBackUpDialog(true)}>
                <img id="import" src="../img/restore.png" className="icon" />
                {t('restore-database')}
            </button>
            <Dialog open={openLoadBackUpDialog}>
                <DialogTitle> {t('database-restore')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('database-restore-warning')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLoadBackUpConfirm}>
                        {t('understand')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default LoadBackUpButton
