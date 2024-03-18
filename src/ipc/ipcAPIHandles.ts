import { ipcMain } from 'electron'
import {
    deletePatient,
    getAllPatients,
    searchPatientsByNameSurnameRC,
    getPatientsByType,
    savePatient,
} from '../backend/patientsManager'
import {
    deletePatientFromStudy,
    deleteStudy,
    getPatientsInStudy,
    getStudies,
    getStudiesByFormType,
    getStudiesByPatientId,
    insertPatientToStudy,
    saveStudy,
    updatePatientsStudies,
} from '../backend/studieManager'
import {
    ipcAPIDeleteChannels,
    ipcAPIGetChannels,
    ipcAPIInsertChannels,
    ipcAPISaveChannels,
    ipcAPIUpdateChannels,
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

ipcMain.handle(
    ipcAPIUpdateChannels.updatePatientsStudies,
    async (event, args) => {
        const [patientId, patientType, studies] = args
        return await updatePatientsStudies(patientId, patientType, studies)
    }
)

ipcMain.handle(ipcAPIGetChannels.getAllPatients, async () => {
    return await getAllPatients()
})

ipcMain.handle(
    ipcAPIGetChannels.searchPatientsByNameSurnameRC,
    async (event, search) => {
        try {
            return await searchPatientsByNameSurnameRC(search)
        } catch (err) {
            return null
        }
    }
)

ipcMain.handle(ipcAPIGetChannels.getPatientsByType, async (event, formType) => {
    return await getPatientsByType(formType)
})

ipcMain.handle(ipcAPIGetChannels.getPatientsInStudy, async (event, id) => {
    return await getPatientsInStudy(id)
})

ipcMain.handle(ipcAPIGetChannels.getStudies, async () => {
    return await getStudies()
})

ipcMain.handle(
    ipcAPIGetChannels.getStudiesByFormType,
    async (event, formType) => {
        return await getStudiesByFormType(formType)
    }
)

ipcMain.handle(ipcAPIGetChannels.getStudiesByPatientId, async (event, args) => {
    const [id, patientType] = args
    return await getStudiesByPatientId(id, patientType)
})

ipcMain.handle(ipcAPIDeleteChannels.deletePatient, async (event, data) => {
    return await deletePatient(data)
})

ipcMain.handle(ipcAPIDeleteChannels.deleteStudy, async (event, data) => {
    return await deleteStudy(data)
})

ipcMain.handle(
    ipcAPIDeleteChannels.deletePatientFromStudy,
    async (event, args) => {
        const [studyId, patientId, formType] = args
        return await deletePatientFromStudy(studyId, patientId, formType)
    }
)
