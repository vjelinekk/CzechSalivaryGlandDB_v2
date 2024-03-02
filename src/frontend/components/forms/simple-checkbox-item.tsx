import React from 'react'

interface SimpleCheckboxItemProps {
    label: string
    dbLabel: string
    selected: boolean
    onSelect: () => void
    disabled: boolean
}

const SimpleCheckboxItem: React.FC<SimpleCheckboxItemProps> = ({
    label,
    selected,
    onSelect,
    disabled,
}) => {
    return (
        <div className="checkboxItemDiv">
            <input
                type="checkbox"
                checked={selected}
                onChange={onSelect}
                disabled={disabled}
            />
            <p>{label}</p>
        </div>
    )
}

export default SimpleCheckboxItem
