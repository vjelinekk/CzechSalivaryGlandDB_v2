import { useState, Dispatch, SetStateAction } from 'react'
import { components } from '../constants'

interface ActiveComponentHook {
    activeComponent: components
    setActiveComponent: Dispatch<SetStateAction<components>>
}

export const useActiveComponent = (
    initialComponent: components
): ActiveComponentHook => {
    const [activeComponent, setActiveComponent] = useState(initialComponent)

    return {
        activeComponent,
        setActiveComponent,
    }
}
