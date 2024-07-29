import React from 'react'

const LoadBackUpButton: React.FC = () => {
    const handleLoadBackUpClick = async () => {
        await window.backUp.loadBackUp()
        window.location.reload()
    }

    return (
        <button onClick={handleLoadBackUpClick}>
            <img id="import" src="../img/restore.png" className="icon" />
            Obnovit databázi
        </button>
    )
}

export default LoadBackUpButton
