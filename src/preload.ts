import { contextBridge, ipcRenderer } from 'electron'
import { PatientType } from './frontend/types'
import {
    ipcAPIDeleteChannels,
    ipcAPIGetChannels,
    ipcAPIInsertChannels,
    ipcAPISaveChannels,
    ipcExportChannels,
    ipcFSChannels,
} from './ipc/ipcChannels'

contextBridge.exposeInMainWorld('api', {
    save: (channel: ipcAPISaveChannels, data: JSON) => {
        return ipcRenderer.invoke(channel, [data])
    },
    insert: (channel: ipcAPIInsertChannels, data: JSON) => {
        return ipcRenderer.invoke(channel, data)
    },
    delete: (channel: ipcAPIDeleteChannels, data: JSON) => {
        return ipcRenderer.invoke(channel, data)
    },
    get: (channel: ipcAPIGetChannels, data?: JSON) => {
        return ipcRenderer.invoke(channel, data)
    },
})

contextBridge.exposeInMainWorld('export', {
    export: (channel: ipcExportChannels, patients: PatientType[]) => {
        return ipcRenderer.invoke(channel, patients)
    },
})

contextBridge.exposeInMainWorld('fs', {
    save: () => {
        return ipcRenderer.invoke(ipcFSChannels.save)
    },
    getFileIcon: (fileName: string) => {
        return ipcRenderer.invoke(ipcFSChannels.getFileIcon, fileName)
    },
    open: (filePath: string) => {
        ipcRenderer.invoke(ipcFSChannels.open, filePath)
    },
})
