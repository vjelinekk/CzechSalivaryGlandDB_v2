import { useState, Dispatch, SetStateAction } from 'react'
import { Components } from '../constants'
import { activeComponentState } from '../types'

interface ActiveComponentHook {
    activeComponent: activeComponentState
    setActiveComponent: Dispatch<SetStateAction<activeComponentState>>
}

export const useActiveComponent = (
    initialComponent: Components
): ActiveComponentHook => {
    const [activeComponent, setActiveComponent] =
        useState<activeComponentState>({ component: initialComponent })

    return {
        activeComponent,
        setActiveComponent,
    }
}
