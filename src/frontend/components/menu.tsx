import React, { Dispatch, SetStateAction } from 'react'
import { Components } from '../constants'
import { activeComponentState } from '../types'

interface MenuProps {
    setActiveComponent: Dispatch<SetStateAction<activeComponentState>>
}

const Menu: React.FC<MenuProps> = ({ setActiveComponent }) => {
    const handleButtonClick = (componentName: Components) => {
        setActiveComponent({ component: componentName })
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
                            handleButtonClick(Components.patientsList)
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
                        onClick={() => handleButtonClick(Components.addPatient)}
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
                            handleButtonClick(Components.studiesList)
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
                        onClick={() => handleButtonClick(Components.addStudy)}
                    >
                        <img
                            id="studie_pridat"
                            src="../img/studie_pridat_outline.png"
                            className="icon"
                        />
                        Přidat studii
                    </button>
                </li>
                <li>
                    <button
                        onClick={() =>
                            handleButtonClick(Components.kaplanMeier)
                        }
                    >
                        <img
                            id="kaplan_meier"
                            src="../img/chart.png"
                            className="icon"
                        />
                        Kaplan-Meier
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Menu
