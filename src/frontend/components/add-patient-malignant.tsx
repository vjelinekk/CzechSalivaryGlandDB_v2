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

const AddPatientMalignant: React.FC<AddPatientProps> = ({
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
                        id="add-parotid-gland"
                        className="mainButton"
                        onClick={() =>
                            handleButtonClick(
                                Components.parotidMalignantGlandForm
                            )
                        }
                    >
                        {t(appTranslationKeys.parotidGland)}
                    </button>
                </li>
                <li>
                    <button
                        id="add-submandibular-gland"
                        className="mainButton"
                        onClick={() =>
                            handleButtonClick(
                                Components.submandibularMalignantGlandForm
                            )
                        }
                    >
                        {t(appTranslationKeys.submandibularGland)}
                    </button>
                </li>
                <li>
                    <button
                        id="add-sublingual-gland"
                        className="mainButton"
                        onClick={() =>
                            handleButtonClick(
                                Components.sublingualMalignantGlandForm
                            )
                        }
                    >
                        {t(appTranslationKeys.sublingualGland)}
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default AddPatientMalignant
