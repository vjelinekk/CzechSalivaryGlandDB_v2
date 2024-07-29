import React from 'react'

const BackUpButton: React.FC = () => {
    const handleBackUpButtonClick = async () => {
        await window.backUp.backUp()
    }

    return (
        <button onClick={handleBackUpButtonClick}>
            <img id="import" src="../img/backup.png" className="icon" />
            Zálohovat databázi
        </button>
    )
}

export default BackUpButton
