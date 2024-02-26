import React from 'react'
import SimpleCheckboxItem from './simple-checkbox-item'
import { useSingleSelection } from '../../hooks/useSingleSelection'

interface SimpleCheckboxesProps {
    title: string
    enableSingleSelect: boolean
    options: string[]
}

const SimpleCheckboxes: React.FC<SimpleCheckboxesProps> = ({
    title,
    enableSingleSelect,
    options,
}) => {
    const { selectedOptions, handleCheckboxChange } =
        useSingleSelection(enableSingleSelect)

    return (
        <>
            <h2>{title}</h2>
            <div className="checkboxDiv">
                {options.map((option) => (
                    <SimpleCheckboxItem
                        key={option}
                        label={option}
                        selected={selectedOptions.includes(option)}
                        onSelect={() => handleCheckboxChange(option)}
                    />
                ))}
            </div>
        </>
    )
}

export default SimpleCheckboxes
