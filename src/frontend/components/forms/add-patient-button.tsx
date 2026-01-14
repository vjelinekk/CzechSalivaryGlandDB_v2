import React, { Dispatch, SetStateAction } from 'react'
import {
    ipcAPIInsertChannels,
    ipcAPISaveChannels,
} from '../../../ipc/ipcChannels'
import { Components, FormStates } from '../../constants'
import {
    ActiveComponentState,
    PatientInStudy,
    PatientType,
    Study,
} from '../../types'
import { useTranslation } from 'react-i18next'
import { appTranslationKeys } from '../../translations'

interface AddPatientButtonProps {
    formState: FormStates
    formData: PatientType
    selectedStudies: Study[]
    formErrors: string[]
    setActiveComponent?: Dispatch<SetStateAction<ActiveComponentState>>
    setActiveMenuButton?: Dispatch<SetStateAction<Components>>
}

const AddPatientButton: React.FC<AddPatientButtonProps> = ({
    formState,
    formData,
    selectedStudies,
    formErrors,
    setActiveComponent,
    setActiveMenuButton,
}) => {
    const { t } = useTranslation()
    const handleButtonClick = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()
        const result = await window.api.save(
            ipcAPISaveChannels.savePatient,
            formData
        )

        Promise.all(
            selectedStudies.map(async (study) => {
                const patientInStudy: PatientInStudy = {
                    id_pacient_db: result,
                    id_studie: study.id,
                    typ_pacienta: formData.form_type,
                }
                console.log(patientInStudy)

                await window.api.insert(
                    ipcAPIInsertChannels.insertPatientToStudy,
                    patientInStudy
                )
            })
        )

        console.log(selectedStudies)

        setActiveComponent({
            component: Components.patientsList,
            activePatient: { ...formData, id: result },
        })

        if (setActiveMenuButton) {
            setActiveMenuButton(Components.patientsList)
        }
    }

    return (
        formState === FormStates.add && (
            <>
                <div className="divider"></div>
                <div className="addPatientButtonDiv">
                    <button
                        className="basicButton"
                        disabled={formErrors.length > 0}
                        onClick={handleButtonClick}
                    >
                        {t(appTranslationKeys.addPatient)}
                    </button>
                </div>
            </>
        )
    )
}

export default AddPatientButton
