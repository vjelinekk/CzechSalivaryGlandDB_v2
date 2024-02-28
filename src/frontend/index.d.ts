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
                channel: string,
                data:
                    | ParotidPatientData
                    | SublingualPatientData
                    | SubmandibularPatientData
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ) => Promise<any>
        }
    }
}
