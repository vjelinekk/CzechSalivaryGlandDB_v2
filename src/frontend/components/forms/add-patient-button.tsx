import React, { Dispatch, SetStateAction } from 'react'
import { ipcAPISaveChannels } from '../../../ipc/ipcChannels'
import { components, FormStates } from '../../constants'
import { activeComponentState, PatientType } from '../../types'

interface AddPatientButtonProps {
    formState: FormStates
    formData: PatientType
    formErrors: string[]
    setActiveComponent?: Dispatch<SetStateAction<activeComponentState>>
}

const AddPatientButton: React.FC<AddPatientButtonProps> = ({
    formState,
    formData,
    formErrors,
    setActiveComponent,
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

        setActiveComponent({
            component: components.patientsList,
            activePatient: { ...formData, id: result },
        })
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
