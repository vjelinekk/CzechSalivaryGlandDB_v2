import React from 'react'
import { Components } from '../constants'
import { activeComponentState } from '../types'

interface AddPatientProps {
    setActiveComponent: React.Dispatch<
        React.SetStateAction<activeComponentState>
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
                        id="add-parotid-gland"
                        className="mainButton"
                        onClick={() =>
                            handleButtonClick(Components.parotidGlandForm)
                        }
                    >
                        Příušní žláza
                    </button>
                </li>
                <li>
                    <button
                        id="add-submandibular-gland"
                        className="mainButton"
                        onClick={() =>
                            handleButtonClick(Components.submandibularGlandForm)
                        }
                    >
                        Podčelistní žláza
                    </button>
                </li>
                <li>
                    <button
                        id="add-sublingual-gland"
                        className="mainButton"
                        onClick={() =>
                            handleButtonClick(Components.sublingualGlandForm)
                        }
                    >
                        Podjazyková žláza
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default AddPatient
