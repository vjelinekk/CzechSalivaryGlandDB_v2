import { render, screen, fireEvent } from '@testing-library/react'
import ParotidMalignantGlandTherapy from '../../src/frontend/components/forms/parotid/malignant/parotid-malignant-gland-therapy.tsx'

import { initI18n } from '../../src/frontend/i18n'
import i18n from 'i18next'
import { formTranslationKeys } from '../../src/frontend/translations'

beforeAll(async () => {
    global.window = Object.create(window)
    window.fs = {
        loadJson: (filePath) => {
            const fs = require('fs')
            const path = require('path')
            const fullPath = path.resolve(__dirname, '../../', filePath)
            return new Promise((resolve, reject) => {
                fs.readFile(fullPath, 'utf8', (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(data))
                    }
                })
            })
        },
    }

    await initI18n()
})

describe('ParotidGlandTherapy', () => {
    const formData = {} // Mocked formData
    const setFormData = jest.fn() // Mocked setFormData function

    test('renders section headings and various input components', () => {
        render(
            <ParotidMalignantGlandTherapy
                formData={formData}
                setFormData={setFormData}
                disabled={false}
            />
        )

        // Assert section headings
        const sectionHeadings = screen.getAllByRole('heading', { level: 1 })
        expect(sectionHeadings).toHaveLength(1) // Only one level 1 heading expected
        expect(sectionHeadings[0]).toHaveTextContent(
            i18n.t(formTranslationKeys.therapy)
        )

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
            <ParotidMalignantGlandTherapy
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
