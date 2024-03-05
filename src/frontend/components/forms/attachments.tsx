import React, { Dispatch, SetStateAction } from 'react'
import { PatientType } from '../../types'

interface AttachmentsProps {
    formData: PatientType | null
    setFormData: Dispatch<SetStateAction<PatientType | null>>
    disabled: boolean
}

const Attachments: React.FC<AttachmentsProps> = ({
    formData,
    setFormData,
    disabled,
}) => {
    const handleAddAttachments = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        // window.fs.save()
    }

    return (
        <div className="sectionDiv">
            <h1>PŘÍLOHY</h1>
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
