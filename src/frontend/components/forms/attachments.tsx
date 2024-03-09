import React from 'react'
import { GlandComponentProps } from '../../types'
import Attachment from './attachment'

const Attachments: React.FC<GlandComponentProps> = ({
    formData,
    setFormData,
    disabled,
}) => {
    const handleAddAttachments = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()
        const fileName = await window.fs.save()
        console.log(fileName)
        setFormData((prev) => {
            const prevAttachments = prev?.attachments || []
            return {
                ...prev,
                attachments: [...prevAttachments, fileName],
            }
        })
    }

    return (
        <div className="sectionDiv">
            <h1>PŘÍLOHY</h1>
            <div className="attachments">
                {formData?.attachments?.map((path, index) => (
                    <Attachment key={index} fileName={path} />
                ))}
            </div>
            <button
                className="basicButton"
                disabled={disabled}
                onClick={handleAddAttachments}
            >
                Přidat přílohu
            </button>
        </div>
    )
}

export default Attachments
