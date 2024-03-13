import React, { useEffect, useRef, useState } from 'react'
import {
    ipcAPIGetChannels,
    ipcAPIInsertChannels,
    ipcAPISaveChannels,
    ipcExportChannels,
} from '../../ipc/ipcChannels'
import {
    FormStates,
    StudyTypes,
    FormType,
    studyTypeToFormTypeMap,
} from '../constants'
import { EditSavedState, PatientInStudy, PatientType, Study } from '../types'
import ParotidGlandForm from './forms/parotid/parotid-gland-form'
import SublingualGlandForm from './forms/sublingual/sublingual-gland-form'
import SubmandibularGlandForm from './forms/submandibular/submandibular-gland-form'
import PatientButton from './patient-button'

interface PatientsListProps {
    defaultActivePatient?: PatientType
    studyType?: StudyTypes
    idStudie?: number
}

const PatientsList: React.FC<PatientsListProps> = ({
    defaultActivePatient,
    studyType,
    idStudie,
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
    const [study, setStudy] = useState<Study | null>({ typ_studie: studyType })
    const currentIdStudie = useRef(idStudie)

    useEffect(() => {
        const getAllPatients = async () => {
            let loadedPatients: PatientType[] = []

            if (!idStudie) {
                if (!studyType || studyType === StudyTypes.special) {
                    loadedPatients = await window.api.get(
                        ipcAPIGetChannels.getAllPatients
                    )
                } else if (studyType) {
                    loadedPatients = await window.api.get(
                        ipcAPIGetChannels.getPatientsByType,
                        studyTypeToFormTypeMap[studyType]
                    )
                }
            } else {
                loadedPatients = await window.api.get(
                    ipcAPIGetChannels.getPatientsInStudy,
                    idStudie
                )
            }

            setPatients(loadedPatients)
        }

        console.log(currentIdStudie)
        console.log(idStudie)

        if (idStudie) {
            if (currentIdStudie.current !== idStudie) {
                setActivePatient(null)
                currentIdStudie.current = idStudie
            }
        }

        getAllPatients()
    }, [editSaved, activePatient, idStudie])

    const handleExport = async () => {
        await window.export.export(ipcExportChannels.export, selectedPatients)
    }

    const handleExportAnonymized = async () => {
        await window.export.export(
            ipcExportChannels.exportAnonymized,
            selectedPatients
        )
    }

    const handleCreateStudy = async () => {
        if (!study?.nazev_studie) {
            window.alert('Název studie nesmí být prázdný')
            return
        }
        const JSONdata = JSON.parse(JSON.stringify(study))
        const studyId = await window.api.save(
            ipcAPISaveChannels.saveStudy,
            JSONdata
        )

        if (!studyId) {
            window.alert('Nepodařilo se vytvořit studii')
            return
        }

        selectedPatients.forEach(async (patient) => {
            const patientInStudy: PatientInStudy = {
                id_pacient_db: patient.id,
                id_studie: studyId,
                typ_pacienta: patient.form_type,
            }
            await window.api.insert(
                ipcAPIInsertChannels.insertPatientToStudy,
                JSON.parse(JSON.stringify(patientInStudy))
            )
        })
    }

    return (
        <>
            <div id="main" className="dataTable">
                {(studyType && (
                    <div>
                        <input
                            type="text"
                            className="studyNameInput"
                            placeholder="Název studie"
                            value={study?.nazev_studie || ''}
                            onChange={(e) =>
                                setStudy((prevStudy) => ({
                                    ...prevStudy,
                                    nazev_studie: e.target.value,
                                }))
                            }
                        />
                        <button
                            className="tableButton"
                            onClick={handleCreateStudy}
                        >
                            Vytvořit novou studii
                        </button>
                    </div>
                )) || (
                    <div>
                        <button onClick={handleExport} className="tableButton">
                            Exportovat
                        </button>
                        <button
                            onClick={handleExportAnonymized}
                            className="tableButton"
                        >
                            Exportovat anonymizovaně
                        </button>
                    </div>
                )}
                <div className="tableSelect">
                    <div>
                        <button
                            className="tableButton"
                            onClick={() => setSelectedPatients(patients)}
                        >
                            Označit vše
                        </button>
                        <button
                            className="tableButton"
                            onClick={() => setSelectedPatients([])}
                        >
                            Zrušit označení
                        </button>
                    </div>
                </div>
                <input id="search" placeholder="Vyhledat..." />
                <div className="wrapper">
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
