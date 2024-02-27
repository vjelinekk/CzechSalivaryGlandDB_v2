import { Dispatch, SetStateAction } from 'react'
import {
    ParotidPatientData,
    SublingualPatientData,
    SubmandibularPatientData,
} from './types'

export interface CommonFormInputProps {
    dbLabel: string
    setFormData: Dispatch<SetStateAction<
        ParotidPatientData | SublingualPatientData | SubmandibularPatientData
    > | null>
}
