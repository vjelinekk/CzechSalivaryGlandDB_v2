import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { EditSavedState } from '../../types'
import { formTranslationKeys } from '../../translations'

interface EditResultProps {
    editSaved: EditSavedState
    setEditSaved: React.Dispatch<React.SetStateAction<EditSavedState>>
}

const EditResult: React.FC<EditResultProps> = ({ editSaved, setEditSaved }) => {
    const { t } = useTranslation()

    if (editSaved) {
        useEffect(() => {
            if (editSaved.saved !== null) {
                setTimeout(() => {
                    setEditSaved((prevEditSaved) => ({
                        ...prevEditSaved,
                        saved: null,
                    }))
                }, 2000)
            }
        }, [editSaved.saved])
    }

    if (!editSaved) {
        return null
    }

    if (editSaved.saved) {
        return (
            <div className="editSuccess">
                <p>{t(formTranslationKeys.changeSaved)}</p>
            </div>
        )
    } else if (editSaved.saved === false) {
        return (
            <div className="editError">
                <p>{t(formTranslationKeys.changeSaveError)}</p>
            </div>
        )
    }
}

export default EditResult
