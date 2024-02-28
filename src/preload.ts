import { contextBridge, ipcRenderer } from 'electron'
import ipcChannels from './ipc/ipcChannels'

contextBridge.exposeInMainWorld('api', {
    send: (channel: string, data: any) => {
        return ipcRenderer.invoke(ipcChannels.addPatient, data)
    },
})
