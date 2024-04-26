import { render, screen, fireEvent } from '@testing-library/react'
import ParotidGlandTherapy from '../../src/frontend/components/forms/parotid/parotid-gland-therapy'

describe('ParotidGlandTherapy', () => {
    const formData = {} // Mocked formData
    const setFormData = jest.fn() // Mocked setFormData function

    test('renders section headings and various input components', () => {
        render(
            <ParotidGlandTherapy
                formData={formData}
                setFormData={setFormData}
                disabled={false}
            />
        )

        // Assert section headings
        const sectionHeadings = screen.getAllByRole('heading', { level: 1 })
        expect(sectionHeadings).toHaveLength(1) // Only one level 1 heading expected
        expect(sectionHeadings[0]).toHaveTextContent('TERAPIE')

        // Assert DatePicker component
        const datePicker = screen.getByText('Datum zahájení léčby:')
        expect(datePicker).toBeInTheDocument()

        // Assert ConditionalCheckboxes components
        const conditionalCheckboxes = screen.getAllByTestId(
            'conditional-checkboxes'
        )
        expect(conditionalCheckboxes).toHaveLength(1) // One ConditionalCheckboxes expected
    })

    test('disables input components when disabled prop is true', () => {
        render(
            <ParotidGlandTherapy
                formData={formData}
                setFormData={setFormData}
                disabled={true}
            />
        )

        // Assert all input components are disabled
        const inputs = screen.getAllByRole('checkbox')
        inputs.forEach((input) => {
            expect(input).toBeDisabled()
        })
    })
})
