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
    ActiveComponentState,
    EditSavedState,
    FilterColumn,
    FilteredColumns,
    PatientInStudy,
    PatientType,
    Study,
    TumorType,
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
import {
    Box,
    Paper,
    TextField,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Typography,
    Stack,
    InputAdornment,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import Security from '@mui/icons-material/Security'
import ImportExport from '@mui/icons-material/ImportExport'
import FilterListIcon from '@mui/icons-material/FilterList'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SubmandibularBenignGlandForm from './forms/submandibular/benign/submandibular-benign-gland-form'
import { useTranslation } from 'react-i18next'
import { appTranslationKeys } from '../translations'
import {
    formTypeToDto,
    filteredColumnsToDto,
    studyToDto,
    dtoToStudyArray,
} from '../mappers/enumMappers'

interface PatientsListProps {
    defaultActivePatient?: PatientType
    studyType?: StudyType
    idStudie?: number
    setActiveComponent?: Dispatch<SetStateAction<ActiveComponentState>>
    setActiveMenuButton?: Dispatch<SetStateAction<Components>>
}

const PatientsList: React.FC<PatientsListProps> = ({
    defaultActivePatient,
    studyType,
    idStudie,
    setActiveComponent,
    setActiveMenuButton,
}) => {
    const { t } = useTranslation()
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
        [FilterColumn.FORM_TYPE]: studyType
            ? studyType === StudyType.special
                ? []
                : [studyTypeToFormTypeMap[studyType]]
            : [],
        [FilterColumn.TYP_NADORU]: studyType
            ? studyType !== StudyType.special
                ? TumorType.MALIGNANT
                : null
            : null,
        [FilterColumn.HISTOPATOLOGIE_VYSLEDEK]: [],
        [FilterColumn.TYP_TERAPIE]: [],
        [FilterColumn.PERZISTENCE]: null,
        [FilterColumn.RECIDIVA]: null,
        [FilterColumn.STAV]: null,
        [FilterColumn.POHLAVI]: null,
    })
    const [isFiltered, setIsFiltered] = useState(false)
    const currentIdStudie = useRef(idStudie)
    const { imported, setImported } = useContext(ImportContext)

    useEffect(() => {
        if (studyType) {
            setFilteredColumns({
                form_type: studyType
                    ? studyType === StudyType.special
                        ? []
                        : [studyTypeToFormTypeMap[studyType]]
                    : [],
                typ_nadoru: studyType
                    ? studyType !== StudyType.special
                        ? TumorType.MALIGNANT
                        : null
                    : null,
                typ_terapie: [],
                histopatologie_vysledek: [],
                perzistence: null,
                recidiva: null,
                stav: null,
                pohlavi: null,
            })
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
                filteredColumnsToDto(filteredColumns),
                idStudie
            )
        } else {
            if (!idStudie) {
                if (!studyType || studyType === StudyType.special) {
                    loadedPatients = (await window.api.get(
                        ipcAPIGetChannels.getAllPatients
                    )) as PatientType[]
                } else if (studyType) {
                    loadedPatients = (await window.api.get(
                        ipcAPIGetChannels.getPatientsByType,
                        formTypeToDto[studyTypeToFormTypeMap[studyType]]
                    )) as PatientType[]
                }
            } else {
                loadedPatients = (await window.api.get(
                    ipcAPIGetChannels.getPatientsInStudy,
                    idStudie
                )) as PatientType[]
            }
        }

        loadedPatients = loadedPatients.sort((a, b) => {
            // First, compare by 'prijmeni'
            const prijmeniA = a.prijmeni || '' // Use empty string if prijmeni is undefined
            const prijmeniB = b.prijmeni || '' // Use empty string if prijmeni is undefined
            const prijmeniComparison = prijmeniA.localeCompare(prijmeniB)

            // If 'prijmeni' is equal, compare by 'jmeno'
            if (prijmeniComparison === 0) {
                const jmenoA = a.jmeno || '' // Use empty string if jmeno is undefined
                const jmenoB = b.jmeno || '' // Use empty string if jmeno is undefined
                return jmenoA.localeCompare(jmenoB)
            }

            return prijmeniComparison
        })

        setPatients(loadedPatients)
        setPatientsToSearchFrom(loadedPatients)
    }

    useEffect(() => {
        const getPatientsStudies = async () => {
            if (activePatient) {
                const studiesDto = await window.api.getStudiesByPatientId(
                    activePatient.id,
                    activePatient.form_type
                )

                setPatientsStudies(dtoToStudyArray(studiesDto))
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
        const studyId = await window.api.save(
            ipcAPISaveChannels.saveStudy,
            studyToDto(study)
        )

        selectedPatients.forEach(async (patient) => {
            const patientInStudy: PatientInStudy = {
                id_pacient_db: patient.id,
                id_studie: studyId,
                typ_pacienta: patient.form_type,
            }

            await window.api.insert(
                ipcAPIInsertChannels.insertPatientToStudy,
                patientInStudy
            )
        })

        setActiveComponent({
            component: Components.studiesList,
            activeStudy: { ...study, id: studyId },
        })

        if (setActiveMenuButton) {
            setActiveMenuButton(Components.studiesList)
        }
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
        <Stack direction="row" spacing={2} sx={{ p: 2, height: '100%' }}>
            <FiltrationMenu
                openFilterMenu={openFiltrationMenu}
                setOpenFilterMenu={setOpenFiltrationMenu}
                filteredColumns={filteredColumns}
                setFilteredColumns={setFilteredColumns}
                studyType={studyType}
                setIsFiltered={setIsFiltered}
            />

            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    width: '20%',
                    minWidth: '280px',
                    maxWidth: '350px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {studyType && !idStudie ? (
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label={t(appTranslationKeys.studyNamePlaceholder)}
                            variant="outlined"
                            data-testid="study-name-input"
                            margin="normal"
                            value={study?.nazev_studie || ''}
                            onChange={(e) =>
                                setStudy((prevStudy) => ({
                                    ...prevStudy,
                                    nazev_studie: e.target.value,
                                }))
                            }
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                if (!study?.nazev_studie) {
                                    setOpenEmptyNameAlert(true)
                                    return
                                }
                                handleCreateStudy()
                            }}
                            sx={{ mt: 1 }}
                        >
                            {t(appTranslationKeys.createStudyButton)}
                        </Button>

                        <Dialog open={openEmptyNameAlert}>
                            <DialogTitle>
                                {t(appTranslationKeys.emptyStudyNameAlertTitle)}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {t(
                                        appTranslationKeys.emptyStudyNameAlertText
                                    )}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={() => setOpenEmptyNameAlert(false)}
                                >
                                    {t(appTranslationKeys.understand)}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                ) : (
                    <>
                        <Accordion
                            defaultExpanded={false}
                            disableGutters
                            elevation={0}
                            sx={{ mb: 1 }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{ px: 0, minHeight: 48 }}
                            >
                                <Typography variant="h6">
                                    {t(appTranslationKeys.patientExport)}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ p: 0 }}>
                                <Stack
                                    direction="column"
                                    spacing={1}
                                    sx={{ mb: 1 }}
                                >
                                    {/* First custom button with fixed icon position */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            backgroundColor: '#29a75e',
                                            borderRadius: 1,
                                            cursor: 'pointer',
                                            '&:hover': { opacity: 0.9 },
                                        }}
                                        onClick={handleExport}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                pl: 2,
                                                pr: 2,
                                                py: 1,
                                                color: 'white',
                                            }}
                                        >
                                            <ImportExport sx={{ mr: 1 }} />
                                            <Typography>
                                                {t(appTranslationKeys.export)}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Second custom button with fixed icon position */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            backgroundColor: '#2c6e47',
                                            borderRadius: 1,
                                            cursor: 'pointer',
                                            '&:hover': { opacity: 0.9 },
                                        }}
                                        onClick={handleExportAnonymized}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                pl: 2,
                                                pr: 2,
                                                py: 1,
                                                color: 'white',
                                            }}
                                        >
                                            <Security sx={{ mr: 1 }} />
                                            <Typography>
                                                {t(
                                                    appTranslationKeys.exportAnonymized
                                                )}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    </>
                )}

                <Accordion
                    defaultExpanded={true}
                    disableGutters
                    elevation={0}
                    sx={{ mt: 1, mb: 1 }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ px: 0, minHeight: 48 }}
                    >
                        <Typography variant="h6">
                            {t(appTranslationKeys.filtrationAndSelection)}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <Stack direction="column" spacing={1} sx={{ mb: 1 }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<FilterListIcon />}
                                onClick={() => setOpenFiltrationMenu(true)}
                                sx={{
                                    justifyContent: 'left',
                                }}
                            >
                                {t(appTranslationKeys.filter)}
                            </Button>

                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<CheckBoxIcon />}
                                onClick={() => setSelectedPatients(patients)}
                                sx={{
                                    justifyContent: 'left',
                                }}
                            >
                                {t(appTranslationKeys.selectAll)}
                            </Button>

                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<CheckBoxOutlineBlankIcon />}
                                onClick={() => setSelectedPatients([])}
                                sx={{
                                    justifyContent: 'left',
                                }}
                            >
                                {t(appTranslationKeys.deselectAll)}
                            </Button>
                        </Stack>
                    </AccordionDetails>
                </Accordion>

                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder={t(appTranslationKeys.search)}
                    onChange={handlePatientSearch}
                    margin="normal"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    {t(appTranslationKeys.patientList)}{' '}
                    {patients.length > 0 ? `(${patients.length})` : ''}
                </Typography>

                <TableContainer
                    component={Paper}
                    sx={{
                        flexGrow: 1,
                        maxHeight: 'calc(100vh - 100px)',
                        overflowY: 'auto',
                        mt: 1,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#888',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#555',
                        },
                    }}
                >
                    <Table
                        stickyHeader
                        data-testid="patients-list"
                        size="small"
                        sx={{ '& td, & th': { border: 0 } }} // This removes borders from all cells in the table
                    >
                        <TableBody>
                            {patients.length === 0 ? (
                                <TableRow>
                                    <TableCell>
                                        <Typography
                                            align="center"
                                            sx={{ py: 2 }}
                                        >
                                            {t(
                                                appTranslationKeys.noPatientsFound
                                            )}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                patients.map((patient, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ p: 0.2, border: 0 }}>
                                            <PatientButton
                                                key={`${patient.id}-${patient.form_type}`}
                                                patient={patient}
                                                isActivePatient={
                                                    activePatient?.id ===
                                                        patient.id &&
                                                    activePatient?.form_type ===
                                                        patient.form_type
                                                }
                                                setActivePatient={
                                                    setActivePatient
                                                }
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
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Box sx={{ flexGrow: 1, height: '100%', overflowY: 'auto' }}>
                {activePatient ? (
                    (activePatient.form_type === FormType.parotidMalignant && (
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
                        <SubmandibularBenignGlandForm
                            key={activePatient.id}
                            defaultFormState={FormStates.view}
                            defaultSelectedStudies={patientsStudies}
                            data={activePatient}
                            editSaved={editSaved}
                            setEditSaved={setEditSaved}
                            setActivePatient={setActivePatient}
                            idStudie={idStudie}
                        />
                    ))
                ) : (
                    <Paper
                        elevation={3}
                        sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 4,
                        }}
                    >
                        <Typography variant="h6" color="textSecondary">
                            {t(appTranslationKeys.selectFromPatientsList)}
                        </Typography>
                    </Paper>
                )}
            </Box>
        </Stack>
    )
}

export default PatientsList
