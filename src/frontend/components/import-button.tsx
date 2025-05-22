import React, { useContext } from 'react'
import { ImportContext } from './import-context'
import { useTranslation } from 'react-i18next'
import { appTranslationKeys } from '../translations'

const ImportButton: React.FC = () => {
    const { setImported } = useContext(ImportContext)
    const { t } = useTranslation()

    const handleImportButtonClick = async () => {
        await window.import.import()
        setImported(true)
    }

    return (
        <button onClick={handleImportButtonClick}>
            <img id="import" src="../img/import.png" className="icon" />
            {t(appTranslationKeys.importData)}
        </button>
    )
}

export default ImportButton
