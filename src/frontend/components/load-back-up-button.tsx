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
import { appTranslationKeys } from '../translations'

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
                {t(appTranslationKeys.restoreDatabase)}
            </button>
            <Dialog open={openLoadBackUpDialog}>
                <DialogTitle>
                    {' '}
                    {t(appTranslationKeys.databaseRestore)}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t(appTranslationKeys.databaseRestoreWarning)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLoadBackUpConfirm}>
                        {t(appTranslationKeys.understand)}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default LoadBackUpButton
