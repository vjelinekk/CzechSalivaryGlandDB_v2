import React from 'react'
import { useSingleSelection } from '../..//hooks/useSingleSelection'
import { ConditionalCheckboxOptionProps } from './conditional-checkbox-option'

interface ConditionalCheckboxesProps {
    title: string
    enableSingleSelect: boolean
    children: React.ReactElement<ConditionalCheckboxOptionProps>[]
}

const ConditionalCheckboxes: React.FC<ConditionalCheckboxesProps> = ({
    title,
    enableSingleSelect,
    children,
}) => {
    const { selectedOptions, handleCheckboxChange } =
        useSingleSelection(enableSingleSelect)

    return (
        <div className="conditionalCheckboxDiv">
            <h3 className="conditionalCheckboxTitle">{title}</h3>
            {children.map((child, index) => {
                return React.cloneElement(child, {
                    key: index,
                    selected: selectedOptions.includes(child.props.label),
                    onSelect: () => handleCheckboxChange(child.props.label),
                })
            })}
        </div>
    )
}

export default ConditionalCheckboxes
