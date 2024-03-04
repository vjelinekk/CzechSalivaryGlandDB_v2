import React from 'react'
import { CommonFormInputProps } from '../../props'

interface DatePickerProps extends CommonFormInputProps {
    label: string
}

const DatePicker: React.FC<DatePickerProps> = ({
    label,
    dbLabel,
    data,
    setFormData,
    disabled,
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
                type="date"
                className="textInput"
                onChange={handleChange}
                value={data ? data : ''}
                disabled={disabled}
            />
        </div>
    )
}

export default DatePicker
