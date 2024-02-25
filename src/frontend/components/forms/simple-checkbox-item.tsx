import React from 'react'

interface SimpleCheckboxItemProps {
    label: string
    selected: boolean
    onSelect: () => void
}

const SimpleCheckboxItem: React.FC<SimpleCheckboxItemProps> = ({
    label,
    selected,
    onSelect,
}) => {
    return (
        <div className="checkboxItemDiv">
            <input type="checkbox" checked={selected} onChange={onSelect} />
            <p>{label}</p>
        </div>
    )
}

export default SimpleCheckboxItem
