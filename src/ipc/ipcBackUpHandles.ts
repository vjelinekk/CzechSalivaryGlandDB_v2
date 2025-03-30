import { app, dialog, ipcMain } from 'electron'
import { ipcBackUpChannels } from './ipcChannels'
import path from 'path'
import fs from 'fs'
import { createTables } from '../backend/dbManager'

const backUp = async () => {
    const result = await dialog.showSaveDialog({
        title: 'Záloha',
        defaultPath: 'csgdb_backup.sqlite',
        filters: [{ name: 'SQlite', extensions: ['sqlite'] }],
    })

    if (result.canceled) {
        return
    }

    let base = app.getAppPath()
    if (app.isPackaged) {
        base = base.replace(`${path.sep}app.asar`, '')
    }

    const dbPath = path.resolve(base, 'db.sqlite')
    const backupPath = result.filePath

    fs.copyFileSync(dbPath, backupPath)
}

const loadBackUp = async () => {
    const result = await dialog.showOpenDialog({
        title: 'Obnova',
        properties: ['openFile'],
        filters: [{ name: 'SQlite', extensions: ['sqlite'] }],
    })

    if (result.canceled) {
        return
    }

    let base = app.getAppPath()
    if (app.isPackaged) {
        base = base.replace(`${path.sep}app.asar`, '')
    }

    const dbPath = path.resolve(base, 'db.sqlite')
    const backupPath = result.filePaths[0]

    fs.copyFileSync(backupPath, dbPath)

    createTables()
}

ipcMain.handle(ipcBackUpChannels.backUp, async () => {
    await backUp()
})

ipcMain.handle(ipcBackUpChannels.loadBackUp, async () => {
    await loadBackUp()
})
