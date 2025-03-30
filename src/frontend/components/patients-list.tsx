import React, {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import {
    ipcAPIGetChannels,
    ipcAPIInsertChannels,
    ipcAPISaveChannels,
    ipcExportChannels,
} from '../../ipc/ipcChannels'
import {
    FormStates,
    StudyType,
    FormType,
    studyTypeToFormTypeMap,
    Components,
} from '../constants'
import {
    activeComponentState,
    EditSavedState,
    FilteredColumns,
    PatientInStudy,
    PatientType,
    Study,
} from '../types'
import ParotidMalignantGlandForm from './forms/parotid/malignant/parotid-malignant-gland-form'
import SublingualMalignantGlandForm from './forms/sublingual/malignant/sublingual-malignant-gland-form'
import SubmandibularMalignantGlandForm from './forms/submandibular/malignant/submandibular-malignant-gland-form'
import ParotidBenignGlandForm from './forms/parotid/benign/parotid-benign-gland-form'
import PatientButton from './patient-button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import FiltrationMenu from './filtration-menu'
import { ImportContext } from './import-context'

interface PatientsListProps {
    defaultActivePatient?: PatientType
    studyType?: StudyType
    idStudie?: number
    setActiveComponent?: Dispatch<SetStateAction<activeComponentState>>
}

const PatientsList: React.FC<PatientsListProps> = ({
    defaultActivePatient,
    studyType,
    idStudie,
    setActiveComponent,
}) => {
    const [patients, setPatients] = useState<PatientType[]>([])
    const [patientsToSearchFrom, setPatientsToSearchFrom] = useState<
        PatientType[]
    >([])
    const [activePatient, setActivePatient] = useState<PatientType | null>(
        defaultActivePatient || null
    )
    const [editSaved, setEditSaved] = useState<EditSavedState>({
        done: false,
        saved: null,
    })
    const [selectedPatients, setSelectedPatients] = useState<PatientType[]>([])
    const [study, setStudy] = useState<Study | null>({ typ_studie: studyType })
    const [patientsStudies, setPatientsStudies] = useState<Study[]>([])
    const [searched, setSearched] = useState<boolean>(false)
    const [openEmptyNameAlert, setOpenEmptyNameAlert] = useState(false)
    const [openFiltrationMenu, setOpenFiltrationMenu] = useState(false)
    const [filteredColumns, setFilteredColumns] = useState<FilteredColumns>({
        form_type: studyType
            ? studyType === StudyType.special
                ? []
                : [studyTypeToFormTypeMap[studyType]]
            : [],
        histopatologie_vysledek: [],
        typ_terapie: [],
    })
    const [isFiltered, setIsFiltered] = useState(false)
    const currentIdStudie = useRef(idStudie)
    const { imported, setImported } = useContext(ImportContext)

    useEffect(() => {
        if (studyType) {
            setFilteredColumns((prev) => ({
                ...prev,
                form_type: studyType
                    ? studyType === StudyType.special
                        ? []
                        : [studyTypeToFormTypeMap[studyType]]
                    : [],
            }))
        }
    }, [studyType])

    useEffect(() => {
        if (imported) {
            getAllPatients()
            setImported(false)
        }
    }, [imported])

    const getAllPatients = async () => {
        let loadedPatients: PatientType[] = []

        if (isFiltered) {
            loadedPatients = await window.api.getFilteredPatients(
                filteredColumns,
                idStudie
            )
        } else {
            if (!idStudie) {
                if (!studyType || studyType === StudyType.special) {
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
        }

        loadedPatients = loadedPatients.sort((a, b) => {
            // First, compare by 'jmeno'
            const jmenoA = a.jmeno || '' // Use empty string if jmeno is undefined
            const jmenoB = b.jmeno || '' // Use empty string if jmeno is undefined
            const jmenoComparison = jmenoA.localeCompare(jmenoB)

            // If 'jmeno' is equal, compare by 'prijmeni'
            if (jmenoComparison === 0) {
                const prijmeniA = a.prijmeni || '' // Use empty string if prijmeni is undefined
                const prijmeniB = b.prijmeni || '' // Use empty string if prijmeni is undefined
                return prijmeniA.localeCompare(prijmeniB)
            }

            return jmenoComparison
        })

        setPatients(loadedPatients)
        setPatientsToSearchFrom(loadedPatients)
    }

    useEffect(() => {
        const getPatientsStudies = async () => {
            if (activePatient) {
                const studies = await window.api.getStudiesByPatientId(
                    activePatient.id,
                    activePatient.form_type
                )

                setPatientsStudies(studies)
            }
        }

        if (idStudie) {
            if (currentIdStudie.current !== idStudie) {
                setActivePatient(null)
                currentIdStudie.current = idStudie
            }
        }

        if (!searched) {
            getAllPatients()
        }
        getPatientsStudies()
    }, [editSaved, activePatient, idStudie, filteredColumns, isFiltered])

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
        const JSONdata = JSON.parse(JSON.stringify(study))
        const studyId = await window.api.save(
            ipcAPISaveChannels.saveStudy,
            JSONdata
        )

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

        setActiveComponent({
            component: Components.studiesList,
            activeStudy: { ...study, id: studyId },
        })
    }

    const handlePatientSearch = async (e: ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value

        if (search === '') {
            getAllPatients()
            setSearched(false)
            return
        }

        const allPatients = [...patientsToSearchFrom]

        const foundPatients = allPatients.filter((patient) => {
            const fullName =
                `${patient.jmeno || ''} ${patient.prijmeni || ''}`.toLowerCase()
            const rodneCislo = patient.rodne_cislo || ''
            return (
                fullName.includes(search.toLowerCase()) ||
                rodneCislo.toLowerCase().includes(search.toLowerCase())
            )
        })

        if (foundPatients) {
            setPatients(foundPatients)
            setSearched(true)
        }
    }

    return (
        <>
            <div id="main" className="dataTable">
                <FiltrationMenu
                    openFilterMenu={openFiltrationMenu}
                    setOpenFilterMenu={setOpenFiltrationMenu}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                    studyType={studyType}
                    setIsFiltered={setIsFiltered}
                />
                {(studyType && !idStudie && (
                    <div style={{ margin: '1rem' }}>
                        <input
                            type="text"
                            className="studyNameInput"
                            placeholder="Název studie"
                            data-testid="study-name-input"
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
                            onClick={() => {
                                if (!study?.nazev_studie) {
                                    setOpenEmptyNameAlert(true)
                                    return
                                }
                                handleCreateStudy()
                            }}
                        >
                            Vytvořit novou studii
                        </button>
                        <Dialog open={openEmptyNameAlert}>
                            <DialogTitle>
                                Název studie nesmí být prázdný
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Byl zadán prázdný název studie
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={() => setOpenEmptyNameAlert(false)}
                                >
                                    Rozumím
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                )) || (
                    <div>
                        <button
                            onClick={handleExport}
                            style={{ backgroundColor: '#29a75e' }}
                            className="tableButton"
                        >
                            Exportovat
                        </button>
                        <button
                            onClick={handleExportAnonymized}
                            style={{ backgroundColor: '#2c6e47' }}
                            className="tableButton"
                        >
                            Exportovat anonymizovaně
                        </button>
                    </div>
                )}
                <div>
                    <button
                        className="tableButton"
                        onClick={() => setOpenFiltrationMenu(true)}
                    >
                        Filtrovat
                    </button>
                </div>
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
                <input
                    id="search"
                    placeholder="Vyhledat..."
                    onChange={handlePatientSearch}
                />
                <div className="wrapper">
                    <table data-testid="patients-list" id="patient-table">
                        <tbody id="patients-tbody">
                            {patients.map((patient, index) => (
                                <tr key={index}>
                                    <td>
                                        <PatientButton
                                            key={`${patient.id}-${patient.form_type}`}
                                            patient={patient}
                                            isActivePatient={
                                                activePatient?.id ===
                                                    patient.id &&
                                                activePatient?.form_type ===
                                                    patient.form_type
                                            }
                                            setActivePatient={setActivePatient}
                                            isSelected={selectedPatients.some(
                                                (p) =>
                                                    p.id === patient.id &&
                                                    p.form_type ===
                                                        patient.form_type
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
                ((activePatient.form_type === FormType.parotidMalignant && (
                    <ParotidMalignantGlandForm
                        key={activePatient.id}
                        defaultFormState={FormStates.view}
                        defaultSelectedStudies={patientsStudies}
                        data={activePatient}
                        editSaved={editSaved}
                        setEditSaved={setEditSaved}
                        setActivePatient={setActivePatient}
                        idStudie={idStudie}
                    />
                )) ||
                    (activePatient.form_type ===
                        FormType.sublingualMalignant && (
                        <SublingualMalignantGlandForm
                            key={activePatient.id}
                            defaultFormState={FormStates.view}
                            defaultSelectedStudies={patientsStudies}
                            data={activePatient}
                            editSaved={editSaved}
                            setEditSaved={setEditSaved}
                            setActivePatient={setActivePatient}
                            idStudie={idStudie}
                        />
                    )) ||
                    (activePatient.form_type ===
                        FormType.submandibularMalignant && (
                        <SubmandibularMalignantGlandForm
                            key={activePatient.id}
                            defaultFormState={FormStates.view}
                            defaultSelectedStudies={patientsStudies}
                            data={activePatient}
                            editSaved={editSaved}
                            setEditSaved={setEditSaved}
                            setActivePatient={setActivePatient}
                            idStudie={idStudie}
                        />
                    )) ||
                    (activePatient.form_type === FormType.parotidBenign && (
                        <ParotidBenignGlandForm
                            key={activePatient.id}
                            defaultFormState={FormStates.view}
                            defaultSelectedStudies={patientsStudies}
                            data={activePatient}
                            editSaved={editSaved}
                            setEditSaved={setEditSaved}
                            setActivePatient={setActivePatient}
                            idStudie={idStudie}
                        />
                    )) ||
                    (activePatient.form_type ===
                        FormType.submandibularBenign && (
                        <SubmandibularMalignantGlandForm
                            key={activePatient.id}
                            defaultFormState={FormStates.view}
                            defaultSelectedStudies={patientsStudies}
                            data={activePatient}
                            editSaved={editSaved}
                            setEditSaved={setEditSaved}
                            setActivePatient={setActivePatient}
                            idStudie={idStudie}
                        />
                    )))}
        </>
    )
}

export default PatientsList
