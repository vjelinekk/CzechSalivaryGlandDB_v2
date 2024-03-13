import React from 'react'
import { Study } from '../types'

interface StudyButtonProps {
    study: Study
    isActiveStudy: boolean
    setActiveStudy: React.Dispatch<React.SetStateAction<Study | null>>
}

const StudyButton: React.FC<StudyButtonProps> = ({
    study,
    isActiveStudy,
    setActiveStudy,
}) => {
    return (
        <button
            onClick={() =>
                setActiveStudy((prevStudy) =>
                    prevStudy?.id === study.id ? null : study
                )
            }
            className={`patientButton ${isActiveStudy ? 'selected' : ''}`}
        >
            {study.nazev_studie}
        </button>
    )
}

export default StudyButton
