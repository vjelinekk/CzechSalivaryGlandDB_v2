import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import SimpleCheckboxes from '../../src/frontend/components/forms/simple-checkboxes'

describe('SimpleCheckboxes component', () => {
    test('renders title and checkboxes', () => {
        const title = 'Test Title'
        const dbLabel = 'testLabel'
        const data = { testLabel: 'Option1,Option2' }
        const setFormDataMock = jest.fn()
        const enableSingleSelect = false
        const options = ['Option1', 'Option2', 'Option3']
        const disabled = false

        render(
            <SimpleCheckboxes
                title={title}
                dbLabel={dbLabel}
                data={data}
                setFormData={setFormDataMock}
                enableSingleSelect={enableSingleSelect}
                options={options}
                disabled={disabled}
            />
        )

        const titleElement = screen.getByText('Test Title')
        expect(titleElement).toBeInTheDocument()

        const checkboxElements = screen.getAllByRole('checkbox')
        expect(checkboxElements).toHaveLength(3)
    })

    test('calls setFormData and updates selectedOptions when checkbox is clicked', () => {
        const title = 'Test Title'
        const dbLabel = 'testLabel'
        const data = { testLabel: 'Option1,Option2' }
        const setFormDataMock = jest.fn()
        const enableSingleSelect = false
        const options = ['Option1', 'Option2', 'Option3']
        const disabled = false

        render(
            <SimpleCheckboxes
                title={title}
                dbLabel={dbLabel}
                data={data}
                setFormData={setFormDataMock}
                enableSingleSelect={enableSingleSelect}
                options={options}
                disabled={disabled}
            />
        )

        const checkboxElement = screen.getAllByRole('checkbox')[2]
        fireEvent.click(checkboxElement)
        expect(setFormDataMock).toHaveBeenCalledTimes(1)
    })

    test('disables checkboxes when disabled is true', () => {
        const title = 'Test Title'
        const dbLabel = 'testLabel'
        const data = { testLabel: 'Option1,Option2' }
        const setFormDataMock = jest.fn()
        const enableSingleSelect = false
        const options = ['Option1', 'Option2', 'Option3']
        const disabled = true

        render(
            <SimpleCheckboxes
                title={title}
                dbLabel={dbLabel}
                data={data}
                setFormData={setFormDataMock}
                enableSingleSelect={enableSingleSelect}
                options={options}
                disabled={disabled}
            />
        )

        const checkboxElements = screen.getAllByRole('checkbox')
        checkboxElements.forEach((checkbox) => {
            expect(checkbox).toBeDisabled()
        })
    })
})
