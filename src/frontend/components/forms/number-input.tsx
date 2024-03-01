import React from 'react'
import { CommonFormInputProps } from '../../props'

interface NumberInputProps extends CommonFormInputProps {
    label: string
}

const NumberInput: React.FC<NumberInputProps> = ({
    label,
    dbLabel,
    data,
    setFormData,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => {
            return { ...prev, [dbLabel]: e.target.value }
        })
    }

    return (
        <div className="textInputDiv">
            <p>{label}: </p>
            <input
                type="number"
                className="textInput"
                onChange={handleChange}
                value={data ? data : ''}
            />
        </div>
    )
}

export default NumberInput
