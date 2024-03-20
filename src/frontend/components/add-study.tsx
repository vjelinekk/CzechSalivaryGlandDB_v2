import React, { Dispatch, SetStateAction } from 'react'
import { Components, StudyType } from '../constants'
import { activeComponentState } from '../types'

interface AddStudyProps {
    setActiveComponent: Dispatch<SetStateAction<activeComponentState>>
}

const AddStudy: React.FC<AddStudyProps> = ({ setActiveComponent }) => {
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
                        Nová studie Příušních žláz
                    </button>
                </li>
                <li>
                    <button
                        className="mainButton"
                        onClick={() => handleButtonClick(StudyType.sublingual)}
                    >
                        Nová studie Podjazykových žláz
                    </button>
                </li>
                <li>
                    <button
                        className="mainButton"
                        onClick={() =>
                            handleButtonClick(StudyType.submandibular)
                        }
                    >
                        Nová studie Podčelistních žláz
                    </button>
                </li>
                <li>
                    <button
                        className="mainButton"
                        onClick={() => handleButtonClick(StudyType.special)}
                    >
                        Nová studie Speciální studie
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default AddStudy
