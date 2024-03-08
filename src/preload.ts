import { contextBridge, ipcRenderer } from 'electron'
import { ipcAPIInsertChannels, ipcFSChannels } from './ipc/ipcChannels'

contextBridge.exposeInMainWorld('api', {
    insert: (channel: ipcAPIInsertChannels, data: JSON) => {
        return ipcRenderer.invoke(channel, [data])
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
