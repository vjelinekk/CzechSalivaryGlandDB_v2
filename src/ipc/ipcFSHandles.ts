import { app, dialog, ipcMain, shell } from 'electron'
import { ipcFSChannels } from './ipcChannels'

ipcMain.handle(ipcFSChannels.save, async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections'],
    })

    if (result.canceled) return

    return result.filePaths[0]
})

ipcMain.handle(ipcFSChannels.getFileIcon, async (event, fileName) => {
    const fileIcon = await app.getFileIcon(fileName, { size: 'normal' })
    fileIcon.resize({ width: 48, height: 48, quality: 'best' })

    return fileIcon.toDataURL({ scaleFactor: 2.0 })
})

ipcMain.handle(ipcFSChannels.open, async (event, filePath) => {
    shell.openPath(filePath)
})
