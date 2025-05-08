import React, { useEffect } from 'react'
import SimpleCheckboxItem from './simple-checkbox-item'
import { useSingleSelection } from '../../hooks/use-single-selection'
import { PatientType } from '../../types'
import getDataFromPatientInterface from '../../utils/getDataFromPatientInterface'
import { CommonFormComponentProps } from '../../props'

interface SimpleCheckboxesProps extends CommonFormComponentProps {
    title?: string
    data: PatientType | null
    enableSingleSelect: boolean
    options: string[]
}

const SimpleCheckboxes: React.FC<SimpleCheckboxesProps> = ({
    title,
    dbLabel,
    data,
    setFormData,
    enableSingleSelect,
    options,
    disabled,
}) => {
    const { selectedOptions, setSelectedOptions, handleCheckboxChange } =
        useSingleSelection({
            enableSingleSelect,
            defaultSelected: getDataFromPatientInterface(data, dbLabel)
                ? (getDataFromPatientInterface(data, dbLabel) as string).split(
                      ','
                  )
                : [''],
            dbLabel,
            setFormData,
        })

    useEffect(() => {
        const storedData = getDataFromPatientInterface(data, dbLabel)

        if (enableSingleSelect) {
            if (storedData) {
                setSelectedOptions([storedData as string])
            } else {
                setSelectedOptions([])
            }
        } else {
            if (storedData) {
                setSelectedOptions((storedData as string).split(','))
            } else {
                setSelectedOptions([])
            }
        }
    }, [data])

    return (
        <>
            {title && <h3>{title}</h3>}
            <div data-testid="simple-checkboxes" className="checkboxDiv">
                {options.map((option) => (
                    <SimpleCheckboxItem
                        key={option}
                        label={option}
                        dbLabel={dbLabel}
                        selected={selectedOptions.includes(option)}
                        onSelect={() => handleCheckboxChange(option)}
                        disabled={disabled}
                    />
                ))}
            </div>
        </>
    )
}

export default SimpleCheckboxes
