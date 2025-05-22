import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GlandComponentProps } from '../../types'
import getDataFromPatientInterface from '../../utils/getDataFromPatientInterface'
import { formTranslationKeys } from '../../translations'

const Notes: React.FC<GlandComponentProps> = ({
    formData,
    setFormData,
    disabled,
}) => {
    const { t } = useTranslation()

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
            <h1>{t(formTranslationKeys.notes)}</h1>
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
