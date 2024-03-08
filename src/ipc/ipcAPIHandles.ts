import { ipcMain } from 'electron'
import { insertPatient } from '../backend/patientsManager'
import { ipcAPIInsertChannels } from './ipcChannels'

ipcMain.handle(ipcAPIInsertChannels.insertPatient, async (event, args) => {
    const [data] = args
    return await insertPatient(data)
})
