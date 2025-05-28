import { render, screen, fireEvent } from '@testing-library/react'
import Notes from '../../src/frontend/components/forms/notes'

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            // Return Czech translations for the expected keys
            if (key === 'notes') {
                return 'poznámky'
            }
            return key
        },
    }),
}))

describe('Notes component', () => {
    test('renders the section heading and textarea input', () => {
        // Mock formData and setFormData function
        const formData = {
            poznamky: 'Sample notes',
        }
        const setFormData = jest.fn()

        // Render the component
        render(
            <Notes
                formData={formData}
                setFormData={setFormData}
                disabled={false}
            />
        )

        // Assert section heading
        const sectionHeading = screen.getByRole('heading', {
            level: 1,
            name: /poznámky/i,
        })
        expect(sectionHeading).toBeInTheDocument()

        // Assert textarea input
        const textarea = screen.getByRole('textbox', { name: '' })
        expect(textarea).toBeInTheDocument()
        expect(textarea).toHaveValue('Sample notes')

        // Simulate user input
        fireEvent.change(textarea, { target: { value: 'Updated notes' } })

        // Assert that setFormData is called with updated notes
        expect(setFormData).toHaveBeenCalledWith({
            ...formData,
            poznamky: 'Updated notes',
        })
    })

    test('renders the section heading and empty textarea input when formData is null', () => {
        // Render the component with null formData
        render(
            <Notes formData={null} setFormData={jest.fn()} disabled={false} />
        )

        // Assert section heading
        const sectionHeading = screen.getByRole('heading', {
            level: 1,
            name: /poznámky/i,
        })
        expect(sectionHeading).toBeInTheDocument()

        // Assert empty textarea input
        const textarea = screen.getByRole('textbox', { name: '' })
        expect(textarea).toBeInTheDocument()
        expect(textarea).toHaveValue('')

        // Simulate user input
        fireEvent.change(textarea, { target: { value: 'New notes' } })
        expect(textarea).toHaveValue('New notes')
    })

    test('disables textarea input when disabled prop is true', () => {
        // Render the component with disabled prop true
        render(
            <Notes formData={null} setFormData={jest.fn()} disabled={true} />
        )

        // Assert textarea is disabled
        const textarea = screen.getByRole('textbox', { name: '' })
        expect(textarea).toBeDisabled()
    })
})
