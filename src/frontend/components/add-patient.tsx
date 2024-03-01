import React from 'react'
import { components } from '../constants'
import { activeComponentState } from '../types'

interface AddPatientProps {
    setActiveComponent: React.Dispatch<
        React.SetStateAction<activeComponentState>
    >
}

const AddPatient: React.FC<AddPatientProps> = ({ setActiveComponent }) => {
    const handleButtonClick = (componentName: components) => {
        setActiveComponent({ component: componentName })
    }

    return (
        <div id="patientAdd">
            <ul>
                <li>
                    <button
                        id="add-parotid-gland"
                        className="mainButton"
                        onClick={() =>
                            handleButtonClick(components.parotidGlandForm)
                        }
                    >
                        Příušní žláza
                    </button>
                </li>
                <li>
                    <button
                        id="add-sublingual-gland"
                        className="mainButton"
                        onClick={() =>
                            handleButtonClick(components.sublingualGlandForm)
                        }
                    >
                        Podjazyková žláza
                    </button>
                </li>
                <li>
                    <button
                        id="add-submandibular-gland"
                        className="mainButton"
                        onClick={() =>
                            handleButtonClick(components.submandibularGlandForm)
                        }
                    >
                        Podčelistní žláza
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default AddPatient
