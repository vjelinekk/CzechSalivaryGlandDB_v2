import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import SimpleCheckboxItem from '../../src/frontend/components/forms/simple-checkbox-item'

describe('SimpleCheckboxItem component', () => {
    test('renders label and checkbox', () => {
        const label = 'Test Label'
        const dbLabel = 'testLabel'
        const selected = false
        const onSelectMock = jest.fn()
        const disabled = false

        render(
            <SimpleCheckboxItem
                label={label}
                dbLabel={dbLabel}
                selected={selected}
                onSelect={onSelectMock}
                disabled={disabled}
            />
        )

        const labelElement = screen.getByText('Test Label')
        expect(labelElement).toBeInTheDocument()

        const checkboxElement = screen.getByRole('checkbox')
        expect(checkboxElement).toBeInTheDocument()
        expect(checkboxElement).not.toBeChecked()
    })

    test('calls onSelect callback when checkbox is clicked', () => {
        const label = 'Test Label'
        const dbLabel = 'testLabel'
        const selected = false
        const onSelectMock = jest.fn()
        const disabled = false

        render(
            <SimpleCheckboxItem
                label={label}
                dbLabel={dbLabel}
                selected={selected}
                onSelect={onSelectMock}
                disabled={disabled}
            />
        )

        const checkboxElement = screen.getByRole('checkbox')
        fireEvent.click(checkboxElement)
        expect(onSelectMock).toHaveBeenCalledTimes(1)
    })

    test('disables checkbox when disabled is true', () => {
        const label = 'Test Label'
        const dbLabel = 'testLabel'
        const selected = false
        const onSelectMock = jest.fn()
        const disabled = true

        render(
            <SimpleCheckboxItem
                label={label}
                dbLabel={dbLabel}
                selected={selected}
                onSelect={onSelectMock}
                disabled={disabled}
            />
        )

        const checkboxElement = screen.getByRole('checkbox')
        expect(checkboxElement).toBeDisabled()
    })
})
