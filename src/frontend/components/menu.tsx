import React, { Dispatch, SetStateAction, useState } from 'react'
import { components } from '../constants'

interface MenuProps {
    setActiveComponent: Dispatch<SetStateAction<components>>
}

const Menu = (props: MenuProps) => {
    const handleButtonClick = (componentName: components) => {
        props.setActiveComponent(componentName)
    }

    return (
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
                        onClick={() =>
                            handleButtonClick(components.patientsList)
                        }
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
                        onClick={() => handleButtonClick(components.addPatient)}
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
                        onClick={() =>
                            handleButtonClick(components.studiesList)
                        }
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
                        onClick={() => handleButtonClick(components.addStudy)}
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
    )
}

export default Menu
