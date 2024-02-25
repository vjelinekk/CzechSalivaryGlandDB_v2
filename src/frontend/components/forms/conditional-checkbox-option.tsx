import React, { ChangeEvent, useState } from 'react'

interface ConditionalCheckboxOptionProps {
    label: string
    children?: React.ReactNode
}

const ConditionalCheckboxOption: React.FC<ConditionalCheckboxOptionProps> = ({
    label,
    children,
}) => {
    const [isChecked, setIsChecked] = useState(false)
    const [showChildren, setShowChildren] = useState(false)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.checked
        setIsChecked(selected)

        if (selected && children) {
            setShowChildren(true)
        } else {
            setShowChildren(false)
        }
    }

    return (
        <>
            <div className="optionalCheckboxOptionDiv">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChange}
                />
                <p className="conditionalOptionLabel">{label}</p>
            </div>
            {showChildren && <div className="nestedDiv">{children}</div>}
        </>
    )
}

export default ConditionalCheckboxOption
