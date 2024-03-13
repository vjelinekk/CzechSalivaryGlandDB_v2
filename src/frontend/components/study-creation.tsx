import React from 'react'
import { StudyTypes } from '../constants'
import PatientsList from './patients-list'

interface StudyCreationProps {
    studyType: StudyTypes
}

const StudyCreation: React.FC<StudyCreationProps> = ({ studyType }) => {
    return (
        <>
            <PatientsList studyType={studyType} />
        </>
    )
}

export default StudyCreation
