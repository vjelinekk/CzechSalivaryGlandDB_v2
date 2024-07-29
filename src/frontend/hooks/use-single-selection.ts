import { useState, Dispatch } from 'react'
import { PatientType } from '../types'

interface SingleSelectionHook {
    selectedOptions: string[]
    setSelectedOptions: Dispatch<React.SetStateAction<string[]>>
    handleCheckboxChange: (label: string) => void
}

interface SingleSelectionParams {
    enableSingleSelect: boolean
    defaultSelected: string[]
    dbLabel: string
    setFormData: Dispatch<React.SetStateAction<PatientType | null>>
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
            setFormData((prevFormData) => {
                if (
                    prevFormData !== undefined &&
                    prevFormData[dbLabel] === label
                ) {
                    prevFormData[dbLabel] = ''
                    return { ...prevFormData }
                }
                return { ...prevFormData, [dbLabel]: label }
            })
        } else {
            setSelectedOptions((prevSelected) => {
                if (prevSelected.includes(label)) {
                    return prevSelected.filter((option) => option !== label)
                } else {
                    return [...prevSelected, label]
                }
            })
            setFormData((prevFormData) => {
                const updatedFormData = { ...prevFormData }
                const stringSplit = (updatedFormData[dbLabel] as string)?.split(
                    ','
                )
                if (
                    updatedFormData[dbLabel] === undefined ||
                    updatedFormData[dbLabel] === null
                ) {
                    updatedFormData[dbLabel] = label + ','
                } else {
                    if (stringSplit?.includes(label)) {
                        updatedFormData[dbLabel] = stringSplit
                            .filter((option) => option !== label)
                            .join(',')
                    } else {
                        updatedFormData[dbLabel] += label + ','
                    }
                }
                if (stringSplit?.length === 0) {
                    updatedFormData[dbLabel] = ''
                }

                return updatedFormData
            })
        }
    }

    return { selectedOptions, setSelectedOptions, handleCheckboxChange }
}
