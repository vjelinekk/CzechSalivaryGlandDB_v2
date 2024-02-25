import React from 'react'

interface TextInputProps {
    label: string
}

const TextInput: React.FC<TextInputProps> = ({ label }) => {
    return (
        <div className="textInputDiv">
            <p>{label}: </p>
            <input type="text" className="textInput" />
        </div>
    )
}

export default TextInput
