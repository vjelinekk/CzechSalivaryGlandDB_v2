import React from 'react'
import { useTranslation } from 'react-i18next'

const BackUpButton: React.FC = () => {
    const { t } = useTranslation()

    const handleBackUpButtonClick = async () => {
        await window.backUp.backUp()
    }

    return (
        <button onClick={handleBackUpButtonClick}>
            <img id="import" src="../img/backup.png" className="icon" />
            {t('backup-database')}
        </button>
    )
}

export default BackUpButton
