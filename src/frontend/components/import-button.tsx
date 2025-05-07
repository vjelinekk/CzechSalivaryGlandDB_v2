import React, { useContext } from 'react'
import { ImportContext } from './import-context'

const ImportButton: React.FC = () => {
    const { setImported } = useContext(ImportContext)

    const handleImportButtonClick = async () => {
        await window.import.import()
        setImported(true)
    }

    return (
        <button onClick={handleImportButtonClick}>
            <img id="import" src="../img/import.png" className="icon" />
            Importovat data
        </button>
    )
}

export default ImportButton
