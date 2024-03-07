import { contextBridge, ipcRenderer } from 'electron'
import {
    ParotidPatientData,
    SublingualPatientData,
    SubmandibularPatientData,
} from './frontend/types'
import ipcChannels from './ipc/ipcChannels'

contextBridge.exposeInMainWorld('api', {
    send: (
        data:
            | ParotidPatientData
            | SublingualPatientData
            | SubmandibularPatientData
    ) => {
        return ipcRenderer.invoke(ipcChannels.addPatient, data)
    },
})

contextBridge.exposeInMainWorld('fs', {
    save: () => {
        return ipcRenderer.invoke(ipcChannels.save)
    },
    getFileIcon: (fileName: string) => {
        return ipcRenderer.invoke(ipcChannels.getFileIcon, fileName)
    },
    open: (filePath: string) => {
        ipcRenderer.invoke(ipcChannels.open, filePath)
    },
})
