import React, { useState } from 'react'
import Menu from './menu'
import PatientsList from './patients-list'
import AddPatient from './add-patient'
import AddPatientBenign from './add-patient-benign'
import AddPatientMalignant from './add-patient-malignant'
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
import KaplanMeier from './kaplan-meier'
import ImportProvider from './import-context'
import LoginForm from './login-form'

const app = () => {
    const { activeComponent, setActiveComponent } = useActiveComponent(
        Components.patientsList
    )

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    return isLoggedIn ? (
        <ImportProvider>
            <Menu setActiveComponent={setActiveComponent} />
            {activeComponent.component === Components.patientsList && (
                <PatientsList
                    defaultActivePatient={activeComponent.activePatient}
                />
            )}
            {activeComponent.component === Components.addPatient && (
                <AddPatient setActiveComponent={setActiveComponent} />
            )}
            {activeComponent.component === Components.addPatientMalignant && (
                <AddPatientMalignant setActiveComponent={setActiveComponent} />
            )}
            {activeComponent.component === Components.addPatientBenign && (
                <AddPatientBenign setActiveComponent={setActiveComponent} />
            )}
            {activeComponent.component === Components.studiesList && (
                <StudiesList defaultActiveStudy={activeComponent.activeStudy} />
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
                <StudyCreation
                    setActiveComponent={setActiveComponent}
                    studyType={activeComponent?.studyType}
                />
            )}
            {activeComponent.component === Components.kaplanMeier && (
                <KaplanMeier />
            )}
        </ImportProvider>
    ) : (
        <LoginForm setIsLoggedIn={setIsLoggedIn} />
    )
}

export default app
