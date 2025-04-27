import React from 'react'
import { Components } from '../constants'
import { ActiveComponentState } from '../types'
import { useTranslation } from 'react-i18next'

interface AddPatientProps {
    setActiveComponent: React.Dispatch<
        React.SetStateAction<ActiveComponentState>
    >
}

const AddPatientBenign: React.FC<AddPatientProps> = ({
    setActiveComponent,
}) => {
    const { t } = useTranslation()

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
                        {t('parotid-gland')}
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
                        {t('submandibular-gland')}
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default AddPatientBenign
