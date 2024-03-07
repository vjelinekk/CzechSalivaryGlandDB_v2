import {
    ParotidPatientData,
    SublingualPatientData,
    SubmandibularPatientData,
} from './types'

export {}

declare global {
    interface Window {
        api: {
            send: (
                data:
                    | ParotidPatientData
                    | SublingualPatientData
                    | SubmandibularPatientData
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ) => Promise<any>
        }
        fs: {
            save: () => Promise<string>
            getFileIcon: (fileName: string) => Promise<string>
            open: (filePath: string) => void
        }
    }
}
