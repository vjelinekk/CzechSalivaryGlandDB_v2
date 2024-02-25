import { useState } from 'react'

interface SingleSelectionHook {
    selectedOptions: string[]
    handleCheckboxChange: (label: string) => void
}

export const useSingleSelection = (
    enableSingleSelect: boolean
): SingleSelectionHook => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])

    const handleCheckboxChange = (label: string) => {
        if (enableSingleSelect) {
            setSelectedOptions((prevSelected) =>
                prevSelected.includes(label) ? [] : [label]
            )
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
