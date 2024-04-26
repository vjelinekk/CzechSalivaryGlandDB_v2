import { describe, expect, test } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import PatientButton from '../../src/frontend/components/patient-button'
import { PatientType } from '../../src/frontend/types'
import { formTypeToStringMap } from '../../src/frontend/constants'

describe('PatientButton component', () => {
    const mockPatient = {
        id: '1',
        jmeno: 'John',
        prijmeni: 'Doe',
        form_type: 1,
    }

    test('should render correctly and handle click events', () => {
        const setActivePatientMock = jest.fn()
        const setSelectedPatientsMock = jest.fn()

        render(
            <PatientButton
                patient={mockPatient}
                setActivePatient={setActivePatientMock}
                isActivePatient={false}
                isSelected={false}
                setSelectedPatients={setSelectedPatientsMock}
            />
        )

        // Assertion: Checkbox and button rendered with correct patient information
        expect(
            screen.getByText(
                `${mockPatient.jmeno} ${mockPatient.prijmeni} (${formTypeToStringMap[mockPatient.form_type]})`
            )
        ).toBeInTheDocument()

        // Simulate checkbox click
        fireEvent.click(screen.getByRole('checkbox'))

        // Simulate button click
        fireEvent.click(screen.getByRole('button'))
    })
})
