import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'
import React from 'react'

const LoadBackUpButton: React.FC = () => {
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
                Obnovit databázi
            </button>
            <Dialog open={openLoadBackUpDialog}>
                <DialogTitle>Obnovení databáze</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Databáze bude obnovena ze zálohy. Tento proces smaže
                        veškerá data v databázi a nahradí je daty ze zálohy.
                        Opravdu chcete pokračovat?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLoadBackUpConfirm}>Rozumím</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default LoadBackUpButton
