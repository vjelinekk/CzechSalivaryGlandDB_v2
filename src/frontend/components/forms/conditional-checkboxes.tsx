import React, { useEffect } from 'react'
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
    const { selectedOptions, setSelectedOptions, handleCheckboxChange } =
        useSingleSelection({
            enableSingleSelect,
            defaultSelected: [
                getDataFromPatientInterface(data, dbLabel)
                    ? getDataFromPatientInterface(data, dbLabel).toString()
                    : '',
            ],
            dbLabel,
            setFormData,
        })

    useEffect(() => {
        setSelectedOptions([
            getDataFromPatientInterface(data, dbLabel)
                ? getDataFromPatientInterface(data, dbLabel).toString()
                : '',
        ])
    }, [data])

    return (
        <div
            data-testid="conditional-checkboxes"
            className="conditionalCheckboxDiv"
        >
            {title && <h3 className="conditionalCheckboxTitle">{title}</h3>}
            {children.map((child, index) => {
                const value = child.props.dbValue || child.props.label
                return React.cloneElement(child, {
                    key: index,
                    selected: selectedOptions.includes(value),
                    onSelect: () => handleCheckboxChange(value),
                })
            })}
        </div>
    )
}

export default ConditionalCheckboxes
