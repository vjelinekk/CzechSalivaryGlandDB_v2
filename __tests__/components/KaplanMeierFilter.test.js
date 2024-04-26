import { describe, expect, test } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import KaplanMeierFilter from '../../src/frontend/components/kaplan-meier-filter'
import { KaplanMeierType } from '../../src/frontend/constants'

const mockKaplanMeierWindow = {
    api: {
        getKaplanMeierData: jest.fn(),
    },
}

describe('KaplanMeierFilter component', () => {
    test('should render correctly and handle curve type change', () => {
        const setKaplanMeierData = jest.fn()
        const setSelectedCurveType = jest.fn()
        act(() => {
            Object.defineProperty(window, 'api', {
                value: mockKaplanMeierWindow.api,
            })

            render(
                <KaplanMeierFilter
                    setKaplanMeierData={setKaplanMeierData}
                    selectedCurveType={KaplanMeierType.survival}
                    setSelectedCurveType={setSelectedCurveType}
                />
            )
        })

        // Assertions
        expect(screen.getByText('Volba typu křivky')).toBeInTheDocument()
        expect(screen.getByLabelText('Křivka přežití')).toBeInTheDocument()
        expect(screen.getByLabelText('Křivka recidivy')).toBeInTheDocument()

        // Simulate curve type change
        fireEvent.click(screen.getByLabelText('Křivka recidivy'))

        // Assertion on callback function
        expect(setSelectedCurveType).toHaveBeenCalledWith(
            KaplanMeierType.recidive
        )
    })
})
