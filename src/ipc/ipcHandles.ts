import { app, dialog, ipcMain, shell } from 'electron'
import { getAll } from '../backend/priusniManager'
import ipcChannels from '../ipc/ipcChannels'

ipcMain.handle(ipcChannels.addPatient, async (event, arg) => {
    console.log(arg)
    const data = await getAll()
    return data
})

ipcMain.handle(ipcChannels.save, async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections'],
    })

    if (result.canceled) return

    console.log(result.filePaths)

    return result.filePaths[0]
})

ipcMain.handle(ipcChannels.getFileIcon, async (event, fileName) => {
    const fileIcon = await app.getFileIcon(fileName, { size: 'normal' })
    fileIcon.resize({ width: 48, height: 48, quality: 'best' })

    return fileIcon.toDataURL({ scaleFactor: 2.0 })
})

ipcMain.handle(ipcChannels.open, async (event, filePath) => {
    shell.openPath(filePath)
})
