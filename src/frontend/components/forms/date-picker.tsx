import React from 'react'
import { CommonFormInputProps } from '../../props'

interface DataPickerProps extends CommonFormInputProps {
    label: string
}

const DataPicker: React.FC<DataPickerProps> = ({
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

export default DataPicker
