import { ipcMain } from 'electron'
import {
    deletePatient,
    getAllPatients,
    getPatientsByType,
    savePatient,
} from '../backend/patientsManager'
import {
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

ipcMain.handle(ipcAPIDeleteChannels.deletePatient, async (event, data) => {
    return await deletePatient(data)
})

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
