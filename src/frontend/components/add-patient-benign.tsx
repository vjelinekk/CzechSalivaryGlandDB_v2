import React from 'react'
import { Components } from '../constants'
import { ActiveComponentState } from '../types'

interface AddPatientProps {
    setActiveComponent: React.Dispatch<
        React.SetStateAction<ActiveComponentState>
    >
}

const addPatientBenign: React.FC<AddPatientProps> = ({
    setActiveComponent,
}) => {
    const handleButtonClick = (componentName: Components) => {
        setActiveComponent({ component: componentName })
    }

    return (
        <div id="patientAdd">
            <ul>
                <li>
                    <button
                        id="add-parotid-benign-gland"
                        className="mainButton"
                        onClick={() =>
                            handleButtonClick(Components.parotidBenignGlandForm)
                        }
                    >
                        Příušní žláza
                    </button>
                </li>
                <li>
                    <button
                        id="add-submandibular-benign-gland"
                        className="mainButton"
                        onClick={() =>
                            handleButtonClick(
                                Components.submandibularBenignGlandForm
                            )
                        }
                    >
                        Podčelistní žláza
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default addPatientBenign
