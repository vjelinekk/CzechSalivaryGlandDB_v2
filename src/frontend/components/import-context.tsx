import { createContext, Dispatch, SetStateAction, useState } from 'react'

interface ImportContextType {
    imported: boolean
    setImported: Dispatch<SetStateAction<boolean>>
}

export const ImportContext = createContext<ImportContextType | null>(null)

const ImportProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [imported, setImported] = useState(false)

    return (
        <ImportContext.Provider value={{ imported, setImported }}>
            {children}
        </ImportContext.Provider>
    )
}

export default ImportProvider
