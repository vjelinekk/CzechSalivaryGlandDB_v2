import React, { useEffect, useState } from 'react'
import { PatientType } from '../../types'
import { CommonFormInputProps } from '../../props'

interface NumberInputProps extends CommonFormInputProps {
    label: string
    calculateFrom?: string[]
    calculate?: () => number | ''
    formData?: PatientType | null
}

const NumberInput: React.FC<NumberInputProps> = ({
    label,
    dbLabel,
    data,
    calculate,
    calculateFrom,
    formData,
    setFormData,
    disabled,
}) => {
    const [value, setValue] = useState<number | ''>(data ? Number(data) : '')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value) ? Number(e.target.value) : '')
        setFormData((prev) => {
            if (e.target.value === '' && prev[dbLabel] !== undefined) {
                prev[dbLabel] = ''
                return { ...prev }
            }

            return { ...prev, [dbLabel]: e.target.value }
        })
    }

    if (calculateFrom && calculateFrom.length > 0) {
        useEffect(() => {
            setValue(calculate ? calculate() : '')
        }, [calculateFrom.map((label) => formData[label])])

        useEffect(() => {
            setFormData((prev) => {
                if (prev) {
                    return {
                        ...prev,
                        [dbLabel]: value,
                    }
                }
                return prev
            })
        }, [value])
    }

    return (
        <div className="textInputDiv">
            <p>{label}: </p>
            <input
                type="number"
                className="textInput"
                onChange={handleChange}
                value={value}
                disabled={disabled}
            />
        </div>
    )
}

export default NumberInput
