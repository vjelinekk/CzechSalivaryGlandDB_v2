import React, { Dispatch, SetStateAction } from 'react'
import { StudyType } from '../constants'
import { ActiveComponentState } from '../types'
import PatientsList from './patients-list'

interface StudyCreationProps {
    setActiveComponent: Dispatch<SetStateAction<ActiveComponentState>>
    studyType: StudyType
}

const StudyCreation: React.FC<StudyCreationProps> = ({
    studyType,
    setActiveComponent,
}) => {
    return (
        <>
            <PatientsList
                setActiveComponent={setActiveComponent}
                studyType={studyType}
            />
        </>
    )
}

export default StudyCreation
