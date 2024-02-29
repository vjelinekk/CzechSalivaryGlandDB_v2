/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Menu from '../src/frontend/components/menu'
import { components } from '../src/frontend/constants'
import { test, expect, jest, afterEach } from '@jest/globals'

// Mock setActiveComponent function
const mockSetActiveComponent = jest.fn()

afterEach(cleanup)

test('Menu renders correctly', () => {
    const { getByText } = render(
        <Menu setActiveComponent={mockSetActiveComponent} />
    )

    // Find buttons by their text content
    const listPatientButton = getByText('Seznam pacientů')
    const addPatientButton = getByText('Přidat pacienta')
    const studiesButton = getByText('Studie')
    const addStudyButton = getByText('Přidat studii')

    // Simulate button clicks
    fireEvent.click(listPatientButton)
    fireEvent.click(addPatientButton)
    fireEvent.click(studiesButton)
    fireEvent.click(addStudyButton)

    // Check if setActiveComponent was called with the correct arguments
    expect(mockSetActiveComponent).toHaveBeenCalledWith(components.patientsList)
    expect(mockSetActiveComponent).toHaveBeenCalledWith(components.addPatient)
    expect(mockSetActiveComponent).toHaveBeenCalledWith(components.studiesList)
    expect(mockSetActiveComponent).toHaveBeenCalledWith(components.addStudy)
})
