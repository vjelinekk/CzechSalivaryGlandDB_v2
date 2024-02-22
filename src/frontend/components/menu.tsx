import React from 'react'

function menu() {
    return (
        <div id="sidebar">
            <div id="bg"></div>
            <div className="welcome">
                <img
                    src="public/img/LOGO_splt.png"
                    id="logo"
                    alt="Česká společnost otorinolaryngologie a chirurgie hlavy a krku"
                />
            </div>
            <ul>
                <li>
                    <button id="list-patient">
                        <img
                            id="pacienti"
                            src="../img/pacienti_outline.png"
                            className="icon"
                        />
                        Seznam pacientů
                    </button>
                </li>
                <li>
                    <button id="add-patient">
                        <img
                            id="pacient_pridat"
                            src="../img/pacient_pridat_outline.png"
                            className="icon"
                        />
                        Přidat pacienta
                    </button>
                </li>
                <li>
                    <button id="studies-btn">
                        <img
                            id="studie"
                            src="../img/studie_outline.png"
                            className="icon"
                        />
                        Studie
                    </button>
                </li>
                <li>
                    <button id="add-study">
                        <img
                            id="studie_pridat"
                            src="../img/studie_pridat_outline.png"
                            className="icon"
                        />
                        Přidat studii
                    </button>
                </li>
                <li>
                    <button id="export-data">
                        <img
                            id="export"
                            src="../img/export_outline.png"
                            className="icon"
                        />
                        Exportovat data
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default menu
