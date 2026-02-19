import React from 'react'
import { render, screen } from '@testing-library/react'
import TNMClassificationCalculator from '../../src/frontend/components/forms/tnm-classification-calculator'
import { expect } from '@jest/globals'

// Mock useTnmData
jest.mock('../../src/frontend/hooks/use-tnm-data', () => ({
    __esModule: true,
    default: () => ({
        tOptions: [
            { id: 1, code: 'TX' },
            { id: 2, code: 'T1' },
            { id: 3, code: 'T2' },
            { id: 4, code: 'T3' },
            { id: 5, code: 'T4a' },
            { id: 6, code: 'T4b' },
        ],
        nOptions: [
            { id: 7, code: 'N0' },
            { id: 8, code: 'N1' },
            { id: 9, code: 'N2a' },
            { id: 10, code: 'N2b' },
            { id: 11, code: 'N2c' },
            { id: 12, code: 'N3a' },
            { id: 13, code: 'N3b' },
        ],
        mOptions: [
            { id: 14, code: 'M0' },
            { id: 15, code: 'M1' },
        ],
        isLoading: false,
        calculateStage: jest.fn(),
    }),
}))

describe('TNMClassificationCalculator component', () => {
    test('renders T-klasifikace checkboxes', () => {
        const formData = {
            tIdLabel: null,
            nIdLabel: null,
            mIdLabel: null,
            gradeIdLabel: null,
        }
        const setFormDataMock = jest.fn()
        const disabled = false

        render(
            <TNMClassificationCalculator
                tIdLabel="tIdLabel"
                nIdLabel="nIdLabel"
                mIdLabel="mIdLabel"
                gradeIdLabel="gradeIdLabel"
                formData={formData}
                setFormData={setFormDataMock}
                disabled={disabled}
            />
        )

        const allCheckboxes = screen.getAllByRole('checkbox')
        // T (6 options + 1 null), N (7 options + 1 null), M (2 options + 1 null) = 7 + 8 + 3 = 18
        expect(allCheckboxes).toHaveLength(18)
    })
})
