import { useState, Dispatch } from 'react'
import { PatientType } from '../types'

interface SingleSelectionHook {
    selectedOptions: string[]
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
                    delete prevFormData[dbLabel]
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
                if (updatedFormData[dbLabel] === undefined) {
                    updatedFormData[dbLabel] = [label]
                } else {
                    if (
                        (updatedFormData[dbLabel] as string[]).includes(label)
                    ) {
                        updatedFormData[dbLabel] = (
                            updatedFormData[dbLabel] as string[]
                        ).filter((option) => option !== label)
                    } else {
                        ;(updatedFormData[dbLabel] as string[]).push(label)
                    }
                }
                if ((updatedFormData[dbLabel] as string[]).length === 0) {
                    delete updatedFormData[dbLabel]
                }

                return updatedFormData
            })
        }
    }

    return { selectedOptions, handleCheckboxChange }
}
