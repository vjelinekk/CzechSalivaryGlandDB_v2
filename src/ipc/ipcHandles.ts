import { dialog, ipcMain } from 'electron'
import { getAll } from '../backend/priusniManager'
import fs from 'fs'
import path from 'path'
import ipcChannels from '../ipc/ipcChannels'

ipcMain.handle(ipcChannels.addPatient, async (event, arg) => {
    console.log(arg)
    const data = await getAll()
    return data
})

ipcMain.handle(ipcChannels.save, async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections'],
        filters: [
            { name: 'PDF a Obrázky', extensions: ['pdf', 'jpg', 'png'] },
            { name: 'PDF soubory', extensions: ['pdf'] },
            { name: 'Obrázky', extensions: ['jpg', 'png'] },
        ],
    })

    if (result.canceled) return

    fs.copyFile(
        result.filePaths[0],
        path.join(__dirname, '../../public/test.pdf'),
        (err) => {
            if (err) throw err
            console.log('test.pdf was copied to destination')
        }
    )
})
