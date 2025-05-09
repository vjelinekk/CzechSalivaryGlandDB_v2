import React from 'react'
import { Components } from '../constants'
import { ActiveComponentState } from '../types'
import { useTranslation } from 'react-i18next'
import { appTranslationKeys } from '../translations'

interface AddPatientProps {
    setActiveComponent: React.Dispatch<
        React.SetStateAction<ActiveComponentState>
    >
}

const AddPatient: React.FC<AddPatientProps> = ({ setActiveComponent }) => {
    const { t } = useTranslation()

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
                        {t(appTranslationKeys.malignantTumor)}
                    </button>
                </li>
                <li>
                    <button
                        id="add-benign-patient"
                        className="mainButton"
                        onClick={() =>
                            handleButtonClick(Components.AddPatientBenign)
                        }
                    >
                        {t(appTranslationKeys.benignTumor)}
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default AddPatient
