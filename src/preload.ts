import { contextBridge, ipcRenderer } from 'electron'
import { FormType } from './backend/constants'
import { KaplanMeierType } from './frontend/constants'
import { FilteredColumns, PatientType, Study } from './frontend/types'
import {
    ipcAPIDeleteChannels,
    ipcAPIGetChannels,
    ipcAPIInsertChannels,
    ipcAPISaveChannels,
    ipcAPIUpdateChannels,
    ipcBackUpChannels,
    ipcEncryptionChannels,
    ipcExportChannels,
    ipcFSChannels,
    ipcImportChannels,
} from './ipc/ipcChannels'

contextBridge.exposeInMainWorld('api', {
    save: (channel: ipcAPISaveChannels, data: JSON) => {
        return ipcRenderer.invoke(channel, [data])
    },
    insert: (channel: ipcAPIInsertChannels, data: JSON) => {
        return ipcRenderer.invoke(channel, data)
    },
    updatePatientsStudies: (
        patientId: number,
        patientType: FormType,
        studies: Study[]
    ) => {
        return ipcRenderer.invoke(ipcAPIUpdateChannels.updatePatientsStudies, [
            patientId,
            patientType,
            studies,
        ])
    },
    delete: (channel: ipcAPIDeleteChannels, data: JSON) => {
        return ipcRenderer.invoke(channel, data)
    },
    deletePatientFromStudy: (
        studyId: number,
        patientId: number,
        formType: FormType
    ) => {
        return ipcRenderer.invoke(ipcAPIDeleteChannels.deletePatientFromStudy, [
            studyId,
            patientId,
            formType,
        ])
    },
    get: (channel: ipcAPIGetChannels, data?: JSON) => {
        return ipcRenderer.invoke(channel, data)
    },
    getStudiesByFormType: (formType: number) => {
        return ipcRenderer.invoke(
            ipcAPIGetChannels.getStudiesByFormType,
            formType
        )
    },
    searchPatientsByNameSurnameRC: (search: string) => {
        return ipcRenderer.invoke(
            ipcAPIGetChannels.searchPatientsByNameSurnameRC,
            search
        )
    },
    getStudiesByPatientId: (patientId: number, patientType: FormType) => {
        return ipcRenderer.invoke(ipcAPIGetChannels.getStudiesByPatientId, [
            patientId,
            patientType,
        ])
    },
    getFilteredPatients: (filter: FilteredColumns, studyId?: number) => {
        return ipcRenderer.invoke(ipcAPIGetChannels.getFilteredPatients, [
            filter,
            studyId,
        ])
    },
    getKaplanMeierData: (
        kaplanMeierType: KaplanMeierType,
        filter: FilteredColumns
    ) => {
        return ipcRenderer.invoke(ipcAPIGetChannels.getKaplanMeierData, [
            kaplanMeierType,
            filter,
        ])
    },
    getPlannedPatientsBetweenDates: (startDate: Date, endDate: Date) => {
        return ipcRenderer.invoke(
            ipcAPIGetChannels.getPlannedPatientsBetweenDates,
            [startDate, endDate]
        )
    },
})

contextBridge.exposeInMainWorld('export', {
    export: (channel: ipcExportChannels, patients: PatientType[]) => {
        return ipcRenderer.invoke(channel, patients)
    },
})

contextBridge.exposeInMainWorld('import', {
    import: () => {
        return ipcRenderer.invoke(ipcImportChannels.import)
    },
})

contextBridge.exposeInMainWorld('fs', {
    save: () => {
        return ipcRenderer.invoke(ipcFSChannels.save)
    },
    getFileIcon: (fileName: string) => {
        return ipcRenderer.invoke(ipcFSChannels.getFileIcon, fileName)
    },
    getFileName: (filePath: string) => {
        return ipcRenderer.invoke(ipcFSChannels.getFileName, filePath)
    },
    open: (filePath: string) => {
        ipcRenderer.invoke(ipcFSChannels.open, filePath)
    },
    loadJson: (filePath: string) => ipcRenderer.invoke('loadJson', filePath),
})

contextBridge.exposeInMainWorld('encryption', {
    setEncryptionKey: (key: string) => {
        return ipcRenderer.invoke(ipcEncryptionChannels.setEncryptionKey, key)
    },
    isPasswordSet: () => {
        return ipcRenderer.invoke(ipcEncryptionChannels.isPasswordSet)
    },
    isEncryptionEnabled: () => {
        return ipcRenderer.invoke(ipcEncryptionChannels.isEncryptionEnabled)
    },
    insertPasswordRow: (password: string, usingEncryption: boolean) => {
        return ipcRenderer.invoke(ipcEncryptionChannels.insertPasswordRow, [
            password,
            usingEncryption,
        ])
    },
    insertPassword: (password: string) => {
        return ipcRenderer.invoke(
            ipcEncryptionChannels.insertPassword,
            password
        )
    },
    insertUsingEncryption: (enabled: boolean) => {
        return ipcRenderer.invoke(
            ipcEncryptionChannels.insertUsingEncryption,
            enabled
        )
    },
    validatePassword: (password: string) => {
        return ipcRenderer.invoke(
            ipcEncryptionChannels.validatePassword,
            password
        )
    },
    generateEncryptionKey: () => {
        return ipcRenderer.invoke(ipcEncryptionChannels.generateEncryptionKey)
    },
})

contextBridge.exposeInMainWorld('backUp', {
    backUp: () => {
        return ipcRenderer.invoke(ipcBackUpChannels.backUp)
    },
    loadBackUp: () => {
        return ipcRenderer.invoke(ipcBackUpChannels.loadBackUp)
    },
})
