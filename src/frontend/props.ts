import { Dispatch, SetStateAction } from 'react'
import { PatientData, PatientType } from './types'

export interface CommonFormInputProps {
    dbLabel: string
    data: string | number
    setFormData: Dispatch<SetStateAction<PatientType> | null>
    disabled: boolean
}

export interface CommonFormProps {
    data: PatientData
}
