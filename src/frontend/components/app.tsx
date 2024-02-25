import React, { useState } from 'react'
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
            {activeComponent === components.patientsList && <PatientsList />}
            {activeComponent === components.addPatient && (
                <AddPatient setActiveComponent={setActiveComponent} />
            )}
            {activeComponent === components.studiesList && <StudiesList />}
            {activeComponent === components.addStudy && <AddStudy />}
            {activeComponent === components.parotidGlandForm && (
                <ParotidGlandForm />
            )}
            {activeComponent === components.sublingualGlandForm && (
                <SublingualGlandForm />
            )}
            {activeComponent === components.submandibularGlandForm && (
                <SubmandibularGlandForm />
            )}
        </>
    )
}

export default app
