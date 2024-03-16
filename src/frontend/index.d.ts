export {}

import {
    ipcAPIDeleteChannels,
    ipcAPIGetChannels,
    ipcAPISaveChannels,
    ipcExportChannels,
} from '../ipc/ipcChannels'
import { FormType } from './constants'
import { PatientType, Study } from './types'

declare global {
    interface Window {
        api: {
            save: (
                channel: ipcAPISaveChannels,
                data: JSON
            ) => Promise<number | null>
            updatePatientsStudies: (
                patientId: number,
                patientType: FormType,
                studies: Study[]
            ) => Promise<boolean>
            insert: (
                channel: ipcAPIInsertChannels,
                data: JSON
            ) => Promise<boolean>
            delete: (
                chanel: ipcAPIDeleteChannels,
                data: JSON
            ) => Promise<boolean>
            deletePatientFromStudy: (
                studyId: number,
                patientId: number,
                patientType: FormType
            ) => Promise<boolean>
            get: (
                channel: ipcAPIGetChannels,
                formType?: FormType
            ) => Promise<PatientType[]>
            getStudiesByFormType: (formType: FormType) => Promise<Study[]>
            getStudiesByPatientId: (
                id: number,
                patientType: FormType
            ) => Promise<Study[]>
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
