import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import TNMClassificationCalculator from '../../src/frontend/components/forms/tnm-classification-calculator'
import { expect } from '@jest/globals'

describe('TNMClassificationCalculator component', () => {
    test('renders T-klasifikace checkboxes', () => {
        const formData = {
            tLabel: '',
            nLabel: '',
            mLabel: '',
            tnmLabel: '',
        }
        const setFormDataMock = jest.fn()
        const disabled = false

        render(
            <TNMClassificationCalculator
                tLabel="tLabel"
                nLabel="nLabel"
                mLabel="mLabel"
                tnmLabel="tnmLabel"
                formData={formData}
                setFormData={setFormDataMock}
                disabled={disabled}
            />
        )

        const allCheckboxes = screen.getAllByRole('checkbox')
        expect(allCheckboxes).toHaveLength(18)
    })
})
