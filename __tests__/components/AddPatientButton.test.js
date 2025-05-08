import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AddPatientButton from '../../src/frontend/components/forms/add-patient-button'
import { FormStates } from '../../src/frontend/constants'
import { jest } from '@jest/globals'
import { act } from 'react-dom/test-utils'

describe('AddPatientButton component', () => {
    const setActiveComponentMock = jest.fn()
    const setActiveMenuButtonMock = jest.fn()

    const formDataMock = {
        // Your mock data for formData
    }
    const selectedStudiesMock = [
        // Your mock data for selectedStudies
    ]
    const formErrorsMock = []

    test('should render the button correctly', () => {
        render(
            <AddPatientButton
                formState={FormStates.add}
                formData={formDataMock}
                selectedStudies={selectedStudiesMock}
                formErrors={formErrorsMock}
                setActiveComponent={setActiveComponentMock}
                setActiveMenuButton={setActiveMenuButtonMock}
            />
        )
        expect(screen.getByText('Přidat pacienta')).toBeInTheDocument()
    })

    test('should call setActiveComponent and handleButtonClick when button is clicked', async () => {
        window.api = {
            save: jest.fn().mockResolvedValue(1),
            insert: jest.fn(),
        }

        render(
            <AddPatientButton
                formState={FormStates.add}
                formData={formDataMock}
                selectedStudies={selectedStudiesMock}
                formErrors={formErrorsMock}
                setActiveComponent={setActiveComponentMock}
                setActiveMenuButton={setActiveMenuButtonMock}
            />
        )

        await act(async () => {
            fireEvent.click(screen.getByText('Přidat pacienta'))
        })

        expect(setActiveComponentMock).toHaveBeenCalled()
    })

    test('should be disabled when formErrors has length > 0', () => {
        render(
            <AddPatientButton
                formState={FormStates.add}
                formData={formDataMock}
                selectedStudies={selectedStudiesMock}
                formErrors={['Error']}
                setActiveComponent={setActiveComponentMock}
                setActiveMenuButton={setActiveMenuButtonMock}
            />
        )
        const button = screen.getByText('Přidat pacienta')
        expect(button).toBeDisabled()
    })
})
