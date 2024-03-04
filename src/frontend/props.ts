import { Dispatch, SetStateAction } from 'react'
import { ConditionalCheckboxOptionProps } from './components/forms/conditional-checkbox-option'
import { PatientData, PatientType } from './types'

export interface CommonFormComponentProps {
    dbLabel: string
    setFormData: Dispatch<SetStateAction<PatientType | null>>
    disabled?: boolean
    children?:
        | React.ReactElement<CommonFormComponentProps>
        | React.ReactElement<CommonFormComponentProps>[]
        | React.ReactElement<ConditionalCheckboxOptionProps>[]
}

export interface CommonFormInputProps extends CommonFormComponentProps {
    data: string | number | Array<string>
}

export interface CommonFormProps {
    data: PatientData
}
