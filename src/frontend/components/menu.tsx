import React, { Dispatch, SetStateAction } from 'react'
import { Components } from '../constants'
import LoadBackUpButton from './load-back-up-button'
import { ActiveComponentState } from '../types'
import BackUpButton from './back-up-button'
import ImportButton from './import-button'
import { Divider } from '@mui/material'

interface MenuProps {
    setActiveComponent: Dispatch<SetStateAction<ActiveComponentState>>
}

const Menu: React.FC<MenuProps> = ({ setActiveComponent }) => {
    const handleButtonClick = (componentName: Components) => {
        setActiveComponent({ component: componentName })
        setActiveButton(componentName)
    }

    const [activeButton, setActiveButton] = React.useState<Components>(
        Components.patientsList
    )

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
                        className={
                            activeButton === Components.patientsList
                                ? 'button-active'
                                : ''
                        }
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
                        id="list-patient"
                        className={
                            activeButton === Components.plannedChecks
                                ? 'button-active'
                                : ''
                        }
                        onClick={() =>
                            handleButtonClick(Components.plannedChecks)
                        }
                    >
                        <img
                            id="pacienti"
                            src="../img/schedule.png"
                            className="icon"
                        />
                        Plánované kontroly
                    </button>
                </li>
                <li>
                    <button
                        id="planned-checks"
                        className={
                            activeButton === Components.addPatient
                                ? 'button-active'
                                : ''
                        }
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
                        className={
                            activeButton === Components.studiesList
                                ? 'button-active'
                                : ''
                        }
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
                        className={
                            activeButton === Components.addStudy
                                ? 'button-active'
                                : ''
                        }
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
                        className={
                            activeButton === Components.kaplanMeier
                                ? 'button-active'
                                : ''
                        }
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
                <Divider />
                <li>
                    <ImportButton />
                </li>
                <li>
                    <BackUpButton />
                </li>
                <li>
                    <LoadBackUpButton />
                </li>
            </ul>
        </div>
    )
}

export default Menu
