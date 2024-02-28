import { contextBridge, ipcRenderer } from 'electron'
import {
    ParotidPatientData,
    SublingualPatientData,
    SubmandibularPatientData,
} from './frontend/types'
import ipcChannels from './ipc/ipcChannels'

contextBridge.exposeInMainWorld('api', {
    send: (
        channel: string,
        data:
            | ParotidPatientData
            | SublingualPatientData
            | SubmandibularPatientData
    ) => {
        return ipcRenderer.invoke(ipcChannels.addPatient, data)
    },
})
