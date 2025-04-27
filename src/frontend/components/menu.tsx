import React, { Dispatch, SetStateAction } from 'react'
import { Components } from '../constants'
import LoadBackUpButton from './load-back-up-button'
import { ActiveComponentState } from '../types'
import BackUpButton from './back-up-button'
import ImportButton from './import-button'
import { Divider } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface MenuProps {
    setActiveComponent: Dispatch<SetStateAction<ActiveComponentState>>
}

const Menu: React.FC<MenuProps> = ({ setActiveComponent }) => {
    const { t } = useTranslation()

    const handleButtonClick = (componentName: Components) => {
        setActiveComponent({ component: componentName })
        setActiveButton(componentName)
    }

    const [activeButton, setActiveButton] = React.useState<Components>(Components.patientsList)

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
                        className={activeButton === Components.patientsList ? 'button-active' : ''}
                        onClick={() => handleButtonClick(Components.patientsList)}
                    >
                        <img
                            id="pacienti"
                            src="../img/pacienti_outline.png"
                            className="icon"
                        />
                        {t('patient-list')}
                    </button>
                </li>
                <li>
                    <button
                        id="list-patient"
                        className={activeButton === Components.plannedChecks ? 'button-active' : ''}
                        onClick={() => handleButtonClick(Components.plannedChecks)}
                    >
                        <img
                            id="pacienti"
                            src="../img/schedule.png"
                            className="icon"
                        />
                        {t('planned-checks')}
                    </button>
                </li>
                <li>
                    <button
                        id="planned-checks"
                        className={activeButton === Components.addPatient ? 'button-active' : ''}
                        onClick={() => handleButtonClick(Components.addPatient)}
                    >
                        <img
                            id="pacient_pridat"
                            src="../img/pacient_pridat_outline.png"
                            className="icon"
                        />
                        {t('add-patient')}
                    </button>
                </li>
                <li>
                    <button
                        id="studies-btn"
                        className={activeButton === Components.studiesList ? 'button-active' : ''}
                        onClick={() => handleButtonClick(Components.studiesList)}
                    >
                        <img
                            id="studie"
                            src="../img/studie_outline.png"
                            className="icon"
                        />
                        {t('studies')}
                    </button>
                </li>
                <li>
                    <button
                        id="add-study"
                        className={activeButton === Components.addStudy ? 'button-active' : ''}
                        onClick={() => handleButtonClick(Components.addStudy)}
                    >
                        <img
                            id="studie_pridat"
                            src="../img/studie_pridat_outline.png"
                            className="icon"
                        />
                        {t('add-study')}
                    </button>
                </li>
                <li>
                    <button
                        className={activeButton === Components.kaplanMeier ? 'button-active' : ''}
                        onClick={() => handleButtonClick(Components.kaplanMeier)}
                    >
                        <img
                            id="kaplan_meier"
                            src="../img/chart.png"
                            className="icon"
                        />
                        {t('kaplan-meier')}
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
                <button
                        className={activeButton === Components.setLanguage ? 'button-active' : ''}
                        onClick={() => handleButtonClick(Components.setLanguage)}
                    >
                        <img
                            id="set-language"
                            src="../img/language.png"
                            className="icon"
                        />
                        {t('language')}
                    </button>
            </ul>
        </div>
    )
}

export default Menu
