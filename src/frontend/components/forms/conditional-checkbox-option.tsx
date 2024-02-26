import React, { ChangeEvent, useState, useEffect } from 'react'

export interface ConditionalCheckboxOptionProps {
    label: string
    children?: React.ReactNode
    selected?: boolean
    onSelect?: () => void
}

const ConditionalCheckboxOption: React.FC<ConditionalCheckboxOptionProps> = ({
    label,
    children,
    selected,
    onSelect,
}) => {
    const [showChildren, setShowChildren] = useState(false)

    useEffect(() => {
        if (selected == undefined) {
            return
        }
        if (!selected) {
            setShowChildren(false)
        }
    }, [selected])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.checked

        if (selected && children) {
            setShowChildren(true)
        } else {
            setShowChildren(false)
        }

        if (onSelect) {
            onSelect()
        }
    }

    return (
        <>
            <div className="optionalCheckboxOptionDiv">
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={handleChange}
                />
                <p className="conditionalOptionLabel">{label}</p>
            </div>
            {showChildren && <div className="nestedDiv">{children}</div>}
        </>
    )
}

export default ConditionalCheckboxOption
