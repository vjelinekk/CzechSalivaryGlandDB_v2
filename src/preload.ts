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
    save: (channel: ipcChannels, patientId?: string, patientType?: string) => {
        return ipcRenderer.invoke(ipcChannels.save)
    },
})
