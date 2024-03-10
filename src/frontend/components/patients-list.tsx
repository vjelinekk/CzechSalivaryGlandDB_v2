import React, { useEffect, useState } from 'react'
import { FormType } from '../../backend/constants'
import { ipcAPIGetChannels } from '../../ipc/ipcChannels'
import { FormStates } from '../constants'
import { EditSavedState, PatientType } from '../types'
import ParotidGlandForm from './forms/parotid/parotid-gland-form'
import SublingualGlandForm from './forms/sublingual/sublingual-gland-form'
import SubmandibularGlandForm from './forms/submandibular/submandibular-gland-form'
import PatientButton from './patient-button'

interface PatientsListProps {
    defaultActivePatient?: PatientType
}

const PatientsList: React.FC<PatientsListProps> = ({
    defaultActivePatient,
}) => {
    const [patients, setPatients] = useState<PatientType[]>([])
    const [activePatient, setActivePatient] = useState<PatientType | null>(
        defaultActivePatient || null
    )
    const [editSaved, setEditSaved] = useState<EditSavedState>({
        done: false,
        saved: null,
    })
    const [selectedPatients, setSelectedPatients] = useState<PatientType[]>([])

    useEffect(() => {
        const getAllPatients = async () => {
            const patients = await window.api.get(
                ipcAPIGetChannels.getAllPatients
            )

            setPatients(patients)
        }

        getAllPatients()
    }, [editSaved, activePatient])

    const handleSelectAll = () => {
        setSelectedPatients(patients)
    }

    const handleDeselectAll = () => {
        setSelectedPatients([])
    }

    return (
        <>
            <div id="main" className="dataTable">
                <input id="search" placeholder="Vyhledat..." />
                <div className="wrapper">
                    <div className="tableSelect">
                        <button
                            className="basicButton"
                            onClick={handleSelectAll}
                        >
                            Označit vše
                        </button>
                        <button
                            className="basicButton"
                            onClick={handleDeselectAll}
                        >
                            Zrušit označení
                        </button>
                        <button className="basicButton">Exportovat</button>
                    </div>
                    <table id="patient-table">
                        <tbody id="patients-tbody">
                            {patients.map((patient, index) => (
                                <tr key={index}>
                                    <td>
                                        <PatientButton
                                            key={patient.id}
                                            patient={patient}
                                            isActivePatient={
                                                activePatient?.id ===
                                                    patient.id &&
                                                activePatient?.form_type ===
                                                    patient.form_type
                                            }
                                            setActivePatient={setActivePatient}
                                            isSelected={selectedPatients.includes(
                                                patient
                                            )}
                                            setSelectedPatients={
                                                setSelectedPatients
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {activePatient &&
                ((activePatient.form_type === FormType.priusni && (
                    <ParotidGlandForm
                        key={activePatient.id}
                        defaultFormState={FormStates.view}
                        data={activePatient}
                        editSaved={editSaved}
                        setEditSaved={setEditSaved}
                        setActivePatient={setActivePatient}
                    />
                )) ||
                    (activePatient.form_type === FormType.podjazykove && (
                        <SublingualGlandForm
                            key={activePatient.id}
                            defaultFormState={FormStates.view}
                            data={activePatient}
                            editSaved={editSaved}
                            setEditSaved={setEditSaved}
                            setActivePatient={setActivePatient}
                        />
                    )) ||
                    (activePatient.form_type === FormType.podcelistni && (
                        <SubmandibularGlandForm
                            key={activePatient.id}
                            defaultFormState={FormStates.view}
                            data={activePatient}
                            editSaved={editSaved}
                            setEditSaved={setEditSaved}
                            setActivePatient={setActivePatient}
                        />
                    )))}
        </>
    )
}

export default PatientsList
