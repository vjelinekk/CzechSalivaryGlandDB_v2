import React, { Dispatch, SetStateAction, useState } from 'react'
import { PatientType } from '../../types'
import getDataFromPatientInterface from '../../utils/getDataFromPatientInterface'

interface NotesProps {
    formData: PatientType | null
    setFormData: Dispatch<SetStateAction<PatientType | null>>
    disabled: boolean
}

const Notes: React.FC<NotesProps> = ({ formData, setFormData, disabled }) => {
    const [notes, setNotes] = useState<string>(
        getDataFromPatientInterface(formData, 'poznamky') as string
    )

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value)
        if (formData) {
            setFormData({ ...formData, poznamky: e.target.value })
        }
    }

    return (
        <div className="sectionDiv">
            <h1>Poznámky</h1>
            <div className="textareaDiv">
                <textarea
                    disabled={disabled}
                    cols={10}
                    rows={10}
                    className="textarea"
                    value={notes}
                    onChange={handleOnChange}
                ></textarea>
            </div>
        </div>
    )
}

export default Notes
