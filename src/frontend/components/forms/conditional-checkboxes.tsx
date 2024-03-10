import React from 'react'
import { PatientType } from '../../types'
import { useSingleSelection } from '../../hooks/use-single-selection'
import { ConditionalCheckboxOptionProps } from './conditional-checkbox-option'
import getDataFromPatientInterface from '../../utils/getDataFromPatientInterface'
import { CommonFormComponentProps } from '../../props'

interface ConditionalCheckboxesProps extends CommonFormComponentProps {
    title?: string
    enableSingleSelect: boolean
    data: PatientType | null
    children: React.ReactElement<ConditionalCheckboxOptionProps>[]
}

const ConditionalCheckboxes: React.FC<ConditionalCheckboxesProps> = ({
    title,
    enableSingleSelect,
    dbLabel,
    data,
    setFormData,
    children,
}) => {
    const { selectedOptions, handleCheckboxChange } = useSingleSelection({
        enableSingleSelect,
        defaultSelected: [
            getDataFromPatientInterface(data, dbLabel)
                ? getDataFromPatientInterface(data, dbLabel).toString()
                : '',
        ],
        dbLabel,
        setFormData,
    })

    return (
        <div className="conditionalCheckboxDiv">
            {title && <h3 className="conditionalCheckboxTitle">{title}</h3>}
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
