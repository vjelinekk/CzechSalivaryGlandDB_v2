import React, { useState } from 'react'
import Menu from './menu'
import PatientsList from './patients-list'
import AddPatient from './add-patient'
import AddPatientBenign from './add-patient-benign'
import AddPatientMalignant from './add-patient-malignant'
import StudiesList from './studies-list'
import AddStudy from './add-study'
import ParotidMalignantGlandForm from './forms/parotid/malignant/parotid-malignant-gland-form'
import SublingualMalignantGlandForm from './forms/sublingual/malignant/sublingual-malignant-gland-form'
import SubmandibularMalignantGlandForm from './forms/submandibular/malignant/submandibular-malignant-gland-form'
import ParotidBenignGlandForm from './forms/parotid/benign/parotid-benign-gland-form'
import SubmandibularBenignGlandForm from './forms/submandibular/benign/submandibular-benign-gland-form'
import StudyCreation from './study-creation'
import { Components, FormStates } from '../constants'
import { useActiveComponent } from '../hooks/use-active-component'
import KaplanMeier from './kaplan-meier'
import ImportProvider from './import-context'
import LoginForm from './login-form'

// CSS imports
import '../css/form_style.css'
import '../css/main.css'
import '../css/sidebar.css'
import '../css/pop_up.css'
import '../css/switch.css'
import '../css/table.css'
import PlannedChecks from './planned-checks'

const app = () => {
    const { activeComponent, setActiveComponent } = useActiveComponent(
        Components.patientsList
    )

    const [activeMenuButton, setActiveMenuButton] = useState<Components>(
        Components.patientsList
    );

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    return isLoggedIn ? (
        <ImportProvider>
            <Menu setActiveComponent={setActiveComponent} activeMenuButton={activeMenuButton} setActiveMenuButton={setActiveMenuButton} />
            {activeComponent.component === Components.patientsList && (
                <PatientsList
                    defaultActivePatient={activeComponent.activePatient}
                />
            )}
            {activeComponent.component === Components.plannedChecks && (
                <PlannedChecks setActiveComponent={setActiveComponent} />
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
            {activeComponent.component ===
                Components.parotidMalignantGlandForm && (
                <ParotidMalignantGlandForm
                    setActiveComponent={setActiveComponent}
                    defaultFormState={FormStates.add}
                    setActiveMenuButton={setActiveMenuButton}
                />
            )}
            {activeComponent.component ===
                Components.sublingualMalignantGlandForm && (
                <SublingualMalignantGlandForm
                    setActiveComponent={setActiveComponent}
                    defaultFormState={FormStates.add}
                    setActiveMenuButton={setActiveMenuButton}
                />
            )}
            {activeComponent.component ===
                Components.submandibularMalignantGlandForm && (
                <SubmandibularMalignantGlandForm
                    setActiveComponent={setActiveComponent}
                    defaultFormState={FormStates.add}
                    setActiveMenuButton={setActiveMenuButton}
                />
            )}
            {activeComponent.component ===
                Components.parotidBenignGlandForm && (
                <ParotidBenignGlandForm
                    setActiveComponent={setActiveComponent}
                    defaultFormState={FormStates.add}
                    setActiveMenuButton={setActiveMenuButton}
                />
            )}
            {activeComponent.component ===
                Components.submandibularBenignGlandForm && (
                <SubmandibularBenignGlandForm
                    setActiveComponent={setActiveComponent}
                    defaultFormState={FormStates.add}
                    setActiveMenuButton={setActiveMenuButton}
                />
            )}
            {activeComponent.component === Components.study && (
                <StudyCreation
                    setActiveComponent={setActiveComponent}
                    studyType={activeComponent?.studyType}
                    setActiveMenuButton={setActiveMenuButton}
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
