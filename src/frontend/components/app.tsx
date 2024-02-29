import React from 'react'
import Menu from './menu'
import PatientsList from './patients-list'
import AddPatient from './add-patient'
import StudiesList from './studies-list'
import AddStudy from './add-study'
import ParotidGlandForm from './forms/parotid-gland-form'
import SublingualGlandForm from './forms/sublingual-gland-form'
import SubmandibularGlandForm from './forms/submandibular-gland-form'
import { components } from '../constants'
import { useActiveComponent } from '../hooks/useActiveComponent'

// CSS imports
import '../css/form_style.css'
import '../css/main.css'
import '../css/sidebar.css'
import '../css/pop_up.css'
import '../css/switch.css'
import '../css/table.css'

const app = () => {
    const { activeComponent, setActiveComponent } = useActiveComponent(
        components.patientsList
    )

    return (
        <>
            <Menu setActiveComponent={setActiveComponent} />
            {activeComponent.component === components.patientsList && (
                <PatientsList />
            )}
            {activeComponent.component === components.addPatient && (
                <AddPatient setActiveComponent={setActiveComponent} />
            )}
            {activeComponent.component === components.studiesList && (
                <StudiesList />
            )}
            {activeComponent.component === components.addStudy && <AddStudy />}
            {activeComponent.component === components.parotidGlandForm && (
                <ParotidGlandForm
                    data={{
                        jmeno: 'Vojta',
                        prijmeni: 'Jelinek',
                    }}
                />
            )}
            {activeComponent.component === components.sublingualGlandForm && (
                <SublingualGlandForm />
            )}
            {activeComponent.component ===
                components.submandibularGlandForm && <SubmandibularGlandForm />}
        </>
    )
}

export default app
