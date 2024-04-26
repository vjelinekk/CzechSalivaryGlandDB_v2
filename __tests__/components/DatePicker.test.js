import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import DatePicker from '../../src/frontend/components/forms/date-picker'

describe('DatePicker component', () => {
    const labelMock = 'Date'
    const dbLabelMock = 'date'
    const dataMock = ''
    const setFormDataMock = jest.fn()
    const disabledMock = false

    test('renders label and input correctly', () => {
        render(
            <DatePicker
                label={labelMock}
                dbLabel={dbLabelMock}
                data={dataMock}
                setFormData={setFormDataMock}
                disabled={disabledMock}
            />
        )

        const labelElement = screen.getByText(`${labelMock}:`)
        const inputElement = screen.getByTestId('date-picker')
        expect(labelElement).toBeInTheDocument()
        expect(inputElement).toBeInTheDocument()
    })

    test('updates form data on input change', () => {
        render(
            <DatePicker
                label={labelMock}
                dbLabel={dbLabelMock}
                data={dataMock}
                setFormData={setFormDataMock}
                disabled={disabledMock}
            />
        )

        const inputValue = '2024-04-15'
        const inputElement = screen.getByTestId('date-picker')
        fireEvent.change(inputElement, { target: { value: inputValue } })
        expect(setFormDataMock).toHaveBeenCalled()
    })

    test('disables input when disabled prop is true', () => {
        render(
            <DatePicker
                label={labelMock}
                dbLabel={dbLabelMock}
                data={dataMock}
                setFormData={setFormDataMock}
                disabled={true}
            />
        )

        const inputElement = screen.getByTestId('date-picker')
        expect(inputElement).toBeDisabled()
    })
})
