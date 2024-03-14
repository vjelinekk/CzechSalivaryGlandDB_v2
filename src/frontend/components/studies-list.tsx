import React, { useEffect, useState } from 'react'
import { ipcAPIGetChannels } from '../../ipc/ipcChannels'
import { Study } from '../types'
import StudyButton from './study-button'
import PatientsList from './patients-list'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

const StudiesList: React.FC = () => {
    const [studies, setStudies] = useState<Study[]>([])
    const [activeStudy, setActiveStudy] = useState<Study | null>(null)
    const [listChanged, setListChanged] = useState(false)

    useEffect(() => {
        const getStudies = async () => {
            const studies = await window.api.get(ipcAPIGetChannels.getStudies)
            setStudies(studies)
        }

        getStudies()
    }, [listChanged])

    return (
        <>
            <div id="main" className="dataTable">
                <input id="search" placeholder="Vyhledat..." />
                <div className="wrapper">
                    {/* <table id="patient-table"> */}
                    {/* <tbody id="patients-tbody"> */}
                    <Stack spacing={1}>
                        {studies.map((study) => (
                            // <tr key={study.id}>
                            // <td>
                            <Box border={1}>
                                <StudyButton
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
            {activeStudy && <PatientsList idStudie={activeStudy?.id} />}
        </>
    )
}

export default StudiesList
