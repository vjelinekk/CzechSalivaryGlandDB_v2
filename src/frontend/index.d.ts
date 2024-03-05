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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            save: () => Promise<any>
        }
    }
}
