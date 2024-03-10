import { ipcMain } from 'electron'
import {
    deletePatient,
    getAllPatients,
    savePatient,
} from '../backend/patientsManager'
import {
    ipcAPIDeleteChannels,
    ipcAPIGetChannels,
    ipcAPISaveChannels,
} from './ipcChannels'

ipcMain.handle(ipcAPISaveChannels.savePatient, async (event, args) => {
    const [data] = args
    return await savePatient(data)
})

ipcMain.handle(ipcAPIDeleteChannels.deletePatient, async (event, data) => {
    return await deletePatient(data)
})

ipcMain.handle(ipcAPIGetChannels.getAllPatients, async () => {
    return await getAllPatients()
})
