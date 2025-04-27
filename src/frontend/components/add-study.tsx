import React, { Dispatch, SetStateAction } from 'react'
import { Components, StudyType } from '../constants'
import { ActiveComponentState } from '../types'
import { useTranslation } from 'react-i18next'

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
                        {t('new-study-parotid')}
                    </button>
                </li>
                <li>
                    <button
                        className="mainButton"
                        onClick={() =>
                            handleButtonClick(StudyType.submandibular)
                        }
                    >
                        {t('new-study-submandibular')}
                    </button>
                </li>
                <li>
                    <button
                        className="mainButton"
                        onClick={() => handleButtonClick(StudyType.sublingual)}
                    >
                        {t('new-study-sublingual')}
                    </button>
                </li>
                <li>
                    <button
                        className="mainButton"
                        onClick={() => handleButtonClick(StudyType.special)}
                    >
                        {t('new-study-special')}
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default AddStudy
