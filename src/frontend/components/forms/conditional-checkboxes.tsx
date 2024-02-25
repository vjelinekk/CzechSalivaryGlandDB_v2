import React from 'react'

interface ConditionalCheckboxesProps {
    title: string
    children: React.ReactNode
}

const ConditionalCheckboxes: React.FC<ConditionalCheckboxesProps> = ({
    title,
    children,
}) => {
    return (
        <div className="conditionalCheckboxDiv">
            <h3 className="conditionalCheckboxTitle">{title}</h3>
            {children}
        </div>
    )
}

export default ConditionalCheckboxes
