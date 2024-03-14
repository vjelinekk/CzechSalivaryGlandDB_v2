import React, { Dispatch, SetStateAction } from 'react'
import { StudyTypes } from '../constants'
import { activeComponentState } from '../types'
import PatientsList from './patients-list'

interface StudyCreationProps {
    setActiveComponent: Dispatch<SetStateAction<activeComponentState>>
    studyType: StudyTypes
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
