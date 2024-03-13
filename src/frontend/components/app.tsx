import React from 'react'
import Menu from './menu'
import PatientsList from './patients-list'
import AddPatient from './add-patient'
import StudiesList from './studies-list'
import AddStudy from './add-study'
import ParotidGlandForm from './forms/parotid/parotid-gland-form'
import SublingualGlandForm from './forms/sublingual/sublingual-gland-form'
import SubmandibularGlandForm from './forms/submandibular/submandibular-gland-form'
import StudyCreation from './study-creation'
import { Components, FormStates } from '../constants'
import { useActiveComponent } from '../hooks/use-active-component'

// CSS imports
import '../css/form_style.css'
import '../css/main.css'
import '../css/sidebar.css'
import '../css/pop_up.css'
import '../css/switch.css'
import '../css/table.css'

const app = () => {
    const { activeComponent, setActiveComponent } = useActiveComponent(
        Components.patientsList
    )

    return (
        <>
            <Menu setActiveComponent={setActiveComponent} />
            {activeComponent.component === Components.patientsList && (
                <PatientsList
                    defaultActivePatient={activeComponent.activePatient}
                />
            )}
            {activeComponent.component === Components.addPatient && (
                <AddPatient setActiveComponent={setActiveComponent} />
            )}
            {activeComponent.component === Components.studiesList && (
                <StudiesList />
            )}
            {activeComponent.component === Components.addStudy && (
                <AddStudy setActiveComponent={setActiveComponent} />
            )}
            {activeComponent.component === Components.parotidGlandForm && (
                <ParotidGlandForm
                    setActiveComponent={setActiveComponent}
                    defaultFormState={FormStates.add}
                />
            )}
            {activeComponent.component === Components.sublingualGlandForm && (
                <SublingualGlandForm
                    setActiveComponent={setActiveComponent}
                    defaultFormState={FormStates.add}
                />
            )}
            {activeComponent.component ===
                Components.submandibularGlandForm && (
                <SubmandibularGlandForm
                    setActiveComponent={setActiveComponent}
                    defaultFormState={FormStates.add}
                />
            )}
            {activeComponent.component === Components.study && (
                <StudyCreation studyType={activeComponent?.studyType} />
            )}
        </>
    )
}

export default app
