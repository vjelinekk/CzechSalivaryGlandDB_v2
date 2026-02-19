import React from 'react'
import { PatientType, TnmValueDefinition } from '../../types'
import SimpleCheckboxItem from './simple-checkbox-item'
import { CommonFormComponentProps } from '../../props'

interface EntityCheckboxesProps extends CommonFormComponentProps {
    title?: string
    data: PatientType | null
    options: TnmValueDefinition[]
    nullableLabel?: string
}

const EntityCheckboxes: React.FC<EntityCheckboxesProps> = ({
    title,
    dbLabel,
    data,
    setFormData,
    options,
    nullableLabel,
    disabled,
}) => {
    const selectedId = data
        ? (data[dbLabel] as number | undefined | null)
        : undefined

    const handleSelect = (id: number) => {
        setFormData((prev) => {
            if (!prev) return prev
            const newValue = prev[dbLabel] === id ? undefined : id
            return { ...prev, [dbLabel]: newValue }
        })
    }

    const handleNullSelect = () => {
        setFormData((prev) => {
            if (!prev) return prev
            // If currently null, toggle to undefined (unselect)
            const newValue: number = prev[dbLabel] === null ? undefined : null
            return { ...prev, [dbLabel]: newValue }
        })
    }

    return (
        <>
            {title && <h3>{title}</h3>}
            <div data-testid="entity-checkboxes" className="checkboxDiv">
                {options.map((option) => (
                    <SimpleCheckboxItem
                        key={option.id}
                        label={option.code}
                        dbLabel={dbLabel}
                        selected={selectedId === option.id}
                        onSelect={() => handleSelect(option.id)}
                        disabled={disabled}
                    />
                ))}
                {nullableLabel && (
                    <SimpleCheckboxItem
                        key="nullable_option"
                        label={nullableLabel}
                        dbLabel={dbLabel}
                        selected={selectedId === null}
                        onSelect={handleNullSelect}
                        disabled={disabled}
                    />
                )}
            </div>
        </>
    )
}

export default EntityCheckboxes
