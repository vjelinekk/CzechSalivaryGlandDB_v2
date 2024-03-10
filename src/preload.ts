import { contextBridge, ipcRenderer } from 'electron'
import {
    ipcAPIDeleteChannels,
    ipcAPIGetChannels,
    ipcAPISaveChannels,
    ipcFSChannels,
} from './ipc/ipcChannels'

contextBridge.exposeInMainWorld('api', {
    save: (channel: ipcAPISaveChannels, data: JSON) => {
        return ipcRenderer.invoke(channel, [data])
    },
    delete: (channel: ipcAPIDeleteChannels, data: JSON) => {
        return ipcRenderer.invoke(channel, data)
    },
    get: (channel: ipcAPIGetChannels) => {
        return ipcRenderer.invoke(channel)
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
