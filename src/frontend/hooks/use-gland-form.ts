import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FormStates } from '../constants'
import { EditSavedState } from '../types'

interface UseGlandArgs {
    editSaved: EditSavedState
    defaultFormState: FormStates
}

interface UseGlandReturn {
    formErrors: string[]
    formState: FormStates
    setFormErrors: Dispatch<SetStateAction<string[]>>
    setFormState: Dispatch<SetStateAction<FormStates>>
}

export const useGlandForm = ({
    editSaved,
    defaultFormState,
}: UseGlandArgs): UseGlandReturn => {
    const [formErrors, setFormErrors] = useState<string[]>([])
    const [formState, setFormState] = useState<FormStates>(defaultFormState)

    if (editSaved) {
        useEffect(() => {
            if (editSaved.saved !== null) {
                setFormState(FormStates.view)
            }
        }, [editSaved])
    }

    return {
        formErrors,
        formState,
        setFormErrors,
        setFormState,
    }
}
