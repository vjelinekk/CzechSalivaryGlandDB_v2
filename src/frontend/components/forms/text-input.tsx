import React, { Dispatch, SetStateAction, useState } from 'react'
import { CommonFormInputProps } from '../../props'

interface TextInputProps extends CommonFormInputProps {
    label: string
    setFormErrors?: Dispatch<SetStateAction<string[]>>
    validation?: (value: string) => boolean
}

const TextInput: React.FC<TextInputProps> = ({
    label,
    dbLabel,
    data,
    setFormData,
    setFormErrors,
    validation,
    disabled,
}) => {
    const [error, setError] = useState(false)
    const [inputValue, setInputValue] = useState(data ? data : '')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        if (e.target.value !== '') {
            if (validation) {
                if (!validation(e.target.value)) {
                    setError(true)
                    setFormErrors &&
                        setFormErrors((prev) => {
                            if (prev.includes(label)) return prev
                            return [...prev, label]
                        })
                    return
                }
            }
        }
        setError(false)
        setFormErrors &&
            setFormErrors((prev) => {
                return prev.filter((error) => error !== label)
            })
        setFormData((prev) => {
            return { ...prev, [dbLabel]: e.target.value }
        })
    }

    return (
        <div className="textInputDiv">
            <p>{label}: </p>
            <div className="inputWithError">
                <input
                    type="text"
                    className="textInput"
                    onChange={handleChange}
                    value={inputValue}
                    disabled={disabled}
                />
                {error && <p className="error">Neplatný vstup</p>}
            </div>
        </div>
    )
}

export default TextInput
