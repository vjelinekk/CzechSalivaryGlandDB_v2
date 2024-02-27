import React from 'react'

interface NumberInputProps {
    label: string
}

const NumberInput: React.FC<NumberInputProps> = ({ label }) => {
    return (
        <div className="textInputDiv">
            <p>{label}: </p>
            <input type="number" className="textInput" />
        </div>
    )
}

export default NumberInput
