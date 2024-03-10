import React, { useEffect } from 'react'
import { EditSavedState } from '../../types'

interface EditResultProps {
    editSaved: EditSavedState
    setEditSaved: React.Dispatch<React.SetStateAction<EditSavedState>>
}

const EditResult: React.FC<EditResultProps> = ({ editSaved, setEditSaved }) => {
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
                <p>Změna uložena</p>
            </div>
        )
    } else if (editSaved.saved === false) {
        return (
            <div className="editError">
                <p>Nastala chyba při ukládání změny</p>
            </div>
        )
    }
}

export default EditResult
