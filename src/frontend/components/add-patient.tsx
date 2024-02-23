import React from 'react'

function AddPatient() {
    return (
        <div id="patientAdd">
            <ul>
                <li>
                    <button id="add-parotid-gland" className="mainButton">
                        Příušní žláza
                    </button>
                </li>
                <li>
                    <button id="add-sublingual-gland" className="mainButton">
                        Podjazyková žláza
                    </button>
                </li>
                <li>
                    <button id="add-submandibular-gland" className="mainButton">
                        Podčelistní žláza
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default AddPatient
