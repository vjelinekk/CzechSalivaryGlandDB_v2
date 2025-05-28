import React, { Dispatch, SetStateAction } from 'react'
import { Components, StudyType } from '../constants'
import { ActiveComponentState } from '../types'
import PatientsList from './patients-list'

interface StudyCreationProps {
    setActiveComponent: Dispatch<SetStateAction<ActiveComponentState>>
    studyType: StudyType
    setActiveMenuButton?: Dispatch<SetStateAction<Components>>
}

const StudyCreation: React.FC<StudyCreationProps> = ({
    studyType,
    setActiveComponent,
    setActiveMenuButton,
}) => {
    return (
        <>
            <PatientsList
                setActiveComponent={setActiveComponent}
                studyType={studyType}
                setActiveMenuButton={setActiveMenuButton}
            />
        </>
    )
}

export default StudyCreation
