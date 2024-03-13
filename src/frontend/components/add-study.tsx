import React, { Dispatch, SetStateAction } from 'react'
import { Components, StudyTypes } from '../constants'
import { activeComponentState } from '../types'

interface AddStudyProps {
    setActiveComponent: Dispatch<SetStateAction<activeComponentState>>
}

const AddStudy: React.FC<AddStudyProps> = ({ setActiveComponent }) => {
    const handleButtonClick = (studyType: StudyTypes) => {
        setActiveComponent({ component: Components.study, studyType })
    }

    return (
        <div id="studies" style={{ display: 'flex' }}>
            <ul>
                <li>
                    <button
                        className="mainButton"
                        onClick={() => handleButtonClick(StudyTypes.parotid)}
                    >
                        Nová studie Příušních žláz
                    </button>
                </li>
                <li>
                    <button
                        className="mainButton"
                        onClick={() => handleButtonClick(StudyTypes.sublingual)}
                    >
                        Nová studie Podjazykových žláz
                    </button>
                </li>
                <li>
                    <button
                        className="mainButton"
                        onClick={() =>
                            handleButtonClick(StudyTypes.submandibular)
                        }
                    >
                        Nová studie Podčelistních žláz
                    </button>
                </li>
                <li>
                    <button
                        className="mainButton"
                        onClick={() => handleButtonClick(StudyTypes.special)}
                    >
                        Nová studie Speciální studie
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default AddStudy
