import { ipcMain } from 'electron'
import { getAll } from '../backend/priusniManager'
import ipcChannels from '../ipc/ipcChannels'

ipcMain.handle(ipcChannels.addPatient, async (event, arg) => {
    console.log(arg)
    const data = await getAll()
    return data
})
