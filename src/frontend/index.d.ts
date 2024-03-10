export {}

import {
    ipcAPIDeleteChannels,
    ipcAPIGetChannels,
    ipcAPISaveChannels,
} from '../ipc/ipcChannels'
import { PatientType } from './types'

declare global {
    interface Window {
        api: {
            save: (
                channel: ipcAPISaveChannels,
                data: JSON
            ) => Promise<number | null>
            delete: (
                chanel: ipcAPIDeleteChannels,
                data: JSON
            ) => Promise<boolean>
            get: (channel: ipcAPIGetChannels) => Promise<PatientType[]>
        }
        fs: {
            save: () => Promise<string>
            getFileIcon: (fileName: string) => Promise<string>
            open: (filePath: string) => void
        }
    }
}
