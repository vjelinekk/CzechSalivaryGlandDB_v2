export {}

import {
    ipcAPIDeleteChannels,
    ipcAPIGetChannels,
    ipcAPISaveChannels,
    ipcExportChannels,
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
        export: {
            export: (
                channel: ipcExportChannels,
                patients: PatientType[]
            ) => Promise<void>
        }
        fs: {
            save: () => Promise<string | null>
            getFileIcon: (fileName: string) => Promise<string>
            open: (filePath: string) => void
        }
    }
}
