import { useState, Dispatch } from 'react'
import { PatientData } from '../types'

interface SingleSelectionHook {
    selectedOptions: string[]
    handleCheckboxChange: (label: string) => void
}

interface SingleSelectionParams {
    enableSingleSelect: boolean
    defaultSelected: string[]
    dbLabel: string
    setFormData: Dispatch<React.SetStateAction<PatientData | null>>
}

export const useSingleSelection = ({
    enableSingleSelect,
    defaultSelected,
    dbLabel,
    setFormData,
}: SingleSelectionParams): SingleSelectionHook => {
    const [selectedOptions, setSelectedOptions] =
        useState<string[]>(defaultSelected)

    const handleCheckboxChange = (label: string) => {
        if (enableSingleSelect) {
            setSelectedOptions((prevSelected) =>
                prevSelected.includes(label) ? [] : [label]
            )
            setFormData((prev) => {
                return { ...prev, [dbLabel]: label }
            })
        } else {
            setSelectedOptions((prevSelected) => {
                if (prevSelected.includes(label)) {
                    return prevSelected.filter((option) => option !== label)
                } else {
                    return [...prevSelected, label]
                }
            })
        }
    }

    return { selectedOptions, handleCheckboxChange }
}
