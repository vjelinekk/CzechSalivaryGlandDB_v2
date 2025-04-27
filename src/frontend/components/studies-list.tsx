import React, { useEffect, useState } from 'react'
import { ipcAPIGetChannels } from '../../ipc/ipcChannels'
import { Study } from '../types'
import StudyButton from './study-button'
import PatientsList from './patients-list'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
interface StudiesListProps {
    defaultActiveStudy?: Study
}

const StudiesList: React.FC<StudiesListProps> = ({ defaultActiveStudy }) => {
    const { t } = useTranslation()
    const [studies, setStudies] = useState<Study[]>([])
    const [activeStudy, setActiveStudy] = useState<Study | null>(
        defaultActiveStudy || null
    )
    const [listChanged, setListChanged] = useState(false)

    const getStudies = async () => {
        const studies = await window.api.get(ipcAPIGetChannels.getStudies)
        setStudies(studies)
    }

    useEffect(() => {
        getStudies()
    }, [listChanged])

    const handleStudiesSearch = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const search = event.target.value.toLowerCase()

        if (search === '') {
            getStudies()
        }

        const allStudies: Study[] = await window.api.get(
            ipcAPIGetChannels.getStudies
        )

        const filteredStudies = allStudies.filter((study) =>
            study.nazev_studie.toLowerCase().includes(search)
        )

        setStudies(filteredStudies)
    }

    return (
        <>
            <div id="main" className="dataTable">
                <input
                    id="search"
                    placeholder={t('search')}
                    onChange={handleStudiesSearch}
                />
                <div className="wrapper">
                    {/* <table id="patient-table"> */}
                    {/* <tbody id="patients-tbody"> */}
                    <Stack spacing={1}>
                        {studies.map((study, index) => (
                            // <tr key={study.id}>
                            // <td>
                            <Box key={index} border={1}>
                                <StudyButton
                                    key={study.id}
                                    defaultStudy={study}
                                    isActiveStudy={study.id === activeStudy?.id}
                                    setActiveStudy={setActiveStudy}
                                    setListChanged={setListChanged}
                                />
                            </Box>
                            // </td>
                            // </tr>
                        ))}
                    </Stack>
                    {/* </tbody> */}
                    {/* </table> */}
                </div>
            </div>
            {activeStudy && (
                <PatientsList
                    idStudie={activeStudy?.id}
                    studyType={activeStudy.typ_studie}
                />
            )}
        </>
    )
}

export default StudiesList
