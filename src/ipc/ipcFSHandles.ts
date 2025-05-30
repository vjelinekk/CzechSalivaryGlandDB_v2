import { app, dialog, ipcMain, shell } from 'electron'
import { ipcFSChannels } from './ipcChannels'
import path from 'path'
import fs from 'fs/promises'

ipcMain.handle(ipcFSChannels.save, async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections'],
    })

    if (result.canceled) return null

    return result.filePaths[0]
})

ipcMain.handle(ipcFSChannels.getFileIcon, async (event, fileName) => {
    const fileIcon = await app.getFileIcon(fileName, { size: 'normal' })
    fileIcon.resize({ width: 48, height: 48, quality: 'best' })

    return fileIcon.toDataURL({ scaleFactor: 2.0 })
})

ipcMain.handle(ipcFSChannels.getFileName, async (event, filePath) => {
    const fileName = path.basename(filePath)
    return fileName
})

ipcMain.handle(ipcFSChannels.open, async (event, filePath) => {
    shell.openPath(filePath)
})

ipcMain.handle(
    ipcFSChannels.getPublicProductionReadyPath,
    async (event, filePath: string) => {
        const isPacked = app.isPackaged
        const basePath = isPacked
            ? path.join(app.getAppPath(), '.webpack', 'renderer')
            : ''
        const fullPath = path.join(basePath, filePath)

        return fullPath
    }
)

ipcMain.handle(ipcFSChannels.loadJson, async (event, filePath) => {
    try {
        const isPacked = app.isPackaged
        const basePath = isPacked
            ? path.join(app.getAppPath(), '.webpack', 'renderer')
            : path.join(__dirname, '..', '..', 'public')
        const fullPath = path.join(basePath, filePath)

        const fileContent = await fs.readFile(fullPath, 'utf-8')
        const json = JSON.parse(fileContent)
        return json
    } catch (error) {
        console.error('Error loading JSON:', error)
        throw new Error('Failed to load JSON')
    }
})
