import React, { useEffect, useState } from 'react'
import { GlandComponentProps } from '../../types'
import getDataFromPatientInterface from '../../utils/getDataFromPatientInterface'

const Notes: React.FC<GlandComponentProps> = ({
    formData,
    setFormData,
    disabled,
}) => {
    const [notes, setNotes] = useState<string>(
        getDataFromPatientInterface(formData, 'poznamky')
            ? (getDataFromPatientInterface(formData, 'poznamky') as string)
            : ''
    )

    useEffect(() => {
        setNotes(
            getDataFromPatientInterface(formData, 'poznamky')
                ? (getDataFromPatientInterface(formData, 'poznamky') as string)
                : ''
        )
    }, [formData])

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
