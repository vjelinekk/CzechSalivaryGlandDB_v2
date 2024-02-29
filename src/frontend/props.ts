import { Dispatch, SetStateAction } from 'react'
import { PatientData } from './types'

export interface CommonFormInputProps {
    dbLabel: string
    data: string | number
    setFormData: Dispatch<SetStateAction<PatientData> | null>
}

export interface CommonFormProps {
    data: PatientData
}
