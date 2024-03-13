import React, { useEffect, useState } from 'react'
import { ipcAPIGetChannels } from '../../ipc/ipcChannels'
import { Study } from '../types'
import StudyButton from './study-button'
import PatientsList from './patients-list'

const StudiesList: React.FC = () => {
    const [studies, setStudies] = useState<Study[]>([])
    const [activeStudy, setActiveStudy] = useState<Study | null>(null)

    useEffect(() => {
        const getStudies = async () => {
            const studies = await window.api.get(ipcAPIGetChannels.getStudies)
            setStudies(studies)
        }

        getStudies()
    }, [])

    return (
        <>
            <div id="main" className="dataTable">
                <input id="search" placeholder="Vyhledat..." />
                <div className="wrapper">
                    <table id="patient-table">
                        <tbody id="patients-tbody">
                            {studies.map((study) => (
                                <tr key={study.id}>
                                    <td>
                                        <StudyButton
                                            study={study}
                                            isActiveStudy={
                                                study.id === activeStudy?.id
                                            }
                                            setActiveStudy={setActiveStudy}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {activeStudy && <PatientsList idStudie={activeStudy?.id} />}
        </>
    )
}

export default StudiesList
