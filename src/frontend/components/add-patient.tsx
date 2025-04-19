import React from 'react'
import { Components } from '../constants'
import { ActiveComponentState } from '../types'

interface AddPatientProps {
    setActiveComponent: React.Dispatch<
        React.SetStateAction<ActiveComponentState>
    >
}

const AddPatient: React.FC<AddPatientProps> = ({ setActiveComponent }) => {
    const handleButtonClick = (componentName: Components) => {
        setActiveComponent({ component: componentName })
    }

    return (
        <div id="patientAdd">
            <ul>
                <li>
                    <button
                        id="add-malignant-patient"
                        className="mainButton"
                        onClick={() =>
                            handleButtonClick(Components.addPatientMalignant)
                        }
                    >
                        Zhoubný nádor
                    </button>
                </li>
                <li>
                    <button
                        id="add-benign-patient"
                        className="mainButton"
                        onClick={() =>
                            handleButtonClick(Components.addPatientBenign)
                        }
                    >
                        Nezhoubný nádor
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default AddPatient
