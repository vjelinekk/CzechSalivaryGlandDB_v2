export {}

import {
    ipcAPIDeleteChannels,
    ipcAPIGetChannels,
    ipcAPISaveChannels,
    ipcExportChannels,
} from '../ipc/ipcChannels'
import { FormType } from './constants'
import {
    KaplanMeierData,
    PatientType,
    PlannedPatientsMap,
    Study,
    JSONObject,
} from './types'

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
            searchPatientsByNameSurnameRC: (
                search: string
            ) => Promise<PatientType[]>
            getFilteredPatients: (
                filter: FilteredColumns,
                studyId?: number
            ) => Promise<PatientType[]>
            getKaplanMeierData: (
                kaplanMeierType: KaplanMeierType,
                filter: FilteredColumns
            ) => Promise<KaplanMeierData>
            getPlannedPatientsBetweenDates: (
                startDate: Date,
                endDate: Date
            ) => Promise<PlannedPatientsMap>
        }
        export: {
            export: (
                channel: ipcExportChannels,
                patients: PatientType[]
            ) => Promise<void>
        }
        import: {
            import: () => Promise<void>
        }
        fs: {
            save: () => Promise<string | null>
            getFileIcon: (fileName: string) => Promise<string>
            getFileName: (filePath: string) => Promise<string>
            open: (filePath: string) => void
            loadJson: (filePath: string) => Promise<Record<string, string>>
        }
        encryption: {
            setEncryptionKey: (key: string) => void
            isPasswordSet: () => Promise<boolean | null>
            isEncryptionEnabled: () => Promise<boolean | null>
            insertPasswordRow: (
                password: string,
                usingEncryption: boolean
            ) => Promise<void>
            insertPassword: (password: string) => Promise<void>
            insertUsingEncryption: (enabled: boolean) => Promise<void>
            validatePassword: (password: string) => Promise<boolean>
            generateEncryptionKey: () => Promise<string>
        }
        backUp: {
            backUp: () => Promise<void>
            loadBackUp: () => Promise<void>
        }
    }
}
