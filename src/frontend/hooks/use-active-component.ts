import { useState, Dispatch, SetStateAction } from 'react'
import { Components } from '../constants'
import { ActiveComponentState } from '../types'

interface ActiveComponentHook {
    activeComponent: ActiveComponentState
    setActiveComponent: Dispatch<SetStateAction<ActiveComponentState>>
}

export const useActiveComponent = (
    initialComponent: Components
): ActiveComponentHook => {
    const [activeComponent, setActiveComponent] =
        useState<ActiveComponentState>({ component: initialComponent })

    return {
        activeComponent,
        setActiveComponent,
    }
}
