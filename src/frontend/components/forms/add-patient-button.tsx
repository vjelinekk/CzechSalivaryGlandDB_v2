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
    const handleButtonClick = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()
        const JSONdata = JSON.parse(JSON.stringify(formData))
        const result = await window.api.save(
            ipcAPISaveChannels.savePatient,
            JSONdata
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
                    JSON.parse(JSON.stringify(patientInStudy))
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
                        Přidat pacienta
                    </button>
                </div>
            </>
        )
    )
}

export default AddPatientButton
