import React, { Dispatch, SetStateAction } from 'react'
import { Components, StudyType } from '../constants'
import { ActiveComponentState } from '../types'
import { useTranslation } from 'react-i18next'
import { appTranslationKeys } from '../translations'

interface AddStudyProps {
    setActiveComponent: Dispatch<SetStateAction<ActiveComponentState>>
}

const AddStudy: React.FC<AddStudyProps> = ({ setActiveComponent }) => {
    const { t } = useTranslation()

    const handleButtonClick = (studyType: StudyType) => {
        setActiveComponent({ component: Components.study, studyType })
    }

    return (
        <div id="studies" style={{ display: 'flex' }}>
            <ul>
                <li>
                    <button
                        className="mainButton"
                        onClick={() => handleButtonClick(StudyType.parotid)}
                    >
                        {t(appTranslationKeys.newStudyParotid)}
                    </button>
                </li>
                <li>
                    <button
                        className="mainButton"
                        onClick={() =>
                            handleButtonClick(StudyType.submandibular)
                        }
                    >
                        {t(appTranslationKeys.newStudySubmandibular)}
                    </button>
                </li>
                <li>
                    <button
                        className="mainButton"
                        onClick={() => handleButtonClick(StudyType.sublingual)}
                    >
                        {t(appTranslationKeys.newStudySublingual)}
                    </button>
                </li>
                <li>
                    <button
                        className="mainButton"
                        onClick={() => handleButtonClick(StudyType.special)}
                    >
                        {t(appTranslationKeys.newStudySpecial)}
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default AddStudy
