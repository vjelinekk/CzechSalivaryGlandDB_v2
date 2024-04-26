import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import ConditionalCheckboxOption from '../../src/frontend/components/forms/conditional-checkbox-option'
import { describe, expect } from '@jest/globals'
import { act } from 'react-dom/test-utils'

describe('ConditionalCheckboxOption component', () => {
    test('should render correctly', async () => {
        await act(async () => {
            render(
                <ConditionalCheckboxOption
                    label="Test"
                    checked={false}
                    setChecked={jest.fn()}
                    disabled={false}
                />
            )
        })

        const checkboxText = screen.getByText('Test')
        expect(checkboxText).toBeInTheDocument()

        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeInTheDocument()

        expect(checkbox).toHaveProperty('checked', false)
        await act(async () => {
            fireEvent.click(checkbox)
        })
        expect(checkbox).toHaveProperty('checked', true)
    })
})
