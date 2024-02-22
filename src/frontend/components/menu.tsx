import React, { useState } from 'react'
// Import components
import PatientsList from './patients-list'
import AddPatient from './add-patient'
import StudiesList from './studies-list'
import AddStudy from './add-study'

function Menu() {
    const [activeComponent, setActiveComponent] = useState('patients-list')

    const handleButtonClick = (componentName: string) => {
        setActiveComponent(componentName)
    }

    return (
        <>
            <div id="sidebar">
                <div id="bg"></div>
                <div className="welcome">
                    <img
                        src="../img/LOGO_splt.png"
                        id="logo"
                        alt="Česká společnost otorinolaryngologie a chirurgie hlavy a krku"
                    />
                </div>
                <ul>
                    <li>
                        <button
                            id="list-patient"
                            onClick={() => handleButtonClick('patients-list')}
                        >
                            <img
                                id="pacienti"
                                src="../img/pacienti_outline.png"
                                className="icon"
                            />
                            Seznam pacientů
                        </button>
                    </li>
                    <li>
                        <button
                            id="add-patient"
                            onClick={() => handleButtonClick('add-patient')}
                        >
                            <img
                                id="pacient_pridat"
                                src="../img/pacient_pridat_outline.png"
                                className="icon"
                            />
                            Přidat pacienta
                        </button>
                    </li>
                    <li>
                        <button
                            id="studies-btn"
                            onClick={() => handleButtonClick('studies-list')}
                        >
                            <img
                                id="studie"
                                src="../img/studie_outline.png"
                                className="icon"
                            />
                            Studie
                        </button>
                    </li>
                    <li>
                        <button
                            id="add-study"
                            onClick={() => handleButtonClick('add-study')}
                        >
                            <img
                                id="studie_pridat"
                                src="../img/studie_pridat_outline.png"
                                className="icon"
                            />
                            Přidat studii
                        </button>
                    </li>
                </ul>
            </div>
            {activeComponent === 'patients-list' && <PatientsList />}
            {activeComponent === 'add-patient' && <AddPatient />}
            {activeComponent === 'studies-list' && <StudiesList />}
            {activeComponent === 'add-study' && <AddStudy />}
        </>
    )
}

export default Menu
