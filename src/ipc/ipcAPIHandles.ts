import { ipcMain } from 'electron'
import {
    deletePatient,
    getAllPatients,
    getPatientsByType,
    savePatient,
} from '../backend/patientsManager'
import {
    deletePatientFromStudy,
    deleteStudy,
    getPatientsInStudy,
    getStudies,
    insertPatientToStudy,
    saveStudy,
} from '../backend/studieManager'
import {
    ipcAPIDeleteChannels,
    ipcAPIGetChannels,
    ipcAPIInsertChannels,
    ipcAPISaveChannels,
} from './ipcChannels'

ipcMain.handle(ipcAPISaveChannels.savePatient, async (event, args) => {
    const [data] = args
    return await savePatient(data)
})

ipcMain.handle(ipcAPISaveChannels.saveStudy, async (event, args) => {
    const [data] = args
    return await saveStudy(data)
})

ipcMain.handle(
    ipcAPIInsertChannels.insertPatientToStudy,
    async (event, data) => {
        return await insertPatientToStudy(data)
    }
)

ipcMain.handle(ipcAPIGetChannels.getAllPatients, async () => {
    return await getAllPatients()
})

ipcMain.handle(ipcAPIGetChannels.getPatientsByType, async (event, formType) => {
    return await getPatientsByType(formType)
})

ipcMain.handle(ipcAPIGetChannels.getPatientsInStudy, async (event, id) => {
    return await getPatientsInStudy(id)
})

ipcMain.handle(ipcAPIGetChannels.getStudies, async () => {
    return await getStudies()
})

ipcMain.handle(ipcAPIDeleteChannels.deletePatient, async (event, data) => {
    return await deletePatient(data)
})

ipcMain.handle(ipcAPIDeleteChannels.deleteStudy, async (event, data) => {
    return await deleteStudy(data)
})

ipcMain.handle(
    ipcAPIDeleteChannels.deletePatientFromStudy,
    async (event, data) => {
        const id = data.id
        return await deletePatientFromStudy(id)
    }
)
