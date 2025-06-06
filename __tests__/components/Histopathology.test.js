import { render, screen, fireEvent } from '@testing-library/react'
import HistopathologyMalignant from '../../src/frontend/components/forms/histopathology-malignant.tsx'

import { initI18n } from '../../src/frontend/i18n'
import i18n from 'i18next'
import { formTranslationKeys } from '../../src/frontend/translations'

beforeAll(async () => {
    global.window = Object.create(window)
    window.fs = {
        loadJson: (filePath) => {
            const fs = require('fs')
            const path = require('path')
            const basePath = path.join(__dirname, '..', '..', 'public')
            const fullPath = path.join(basePath, filePath)
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

describe('Histopathology component', () => {
    const formData = {} // Mocked formData
    const setFormData = jest.fn() // Mocked setFormData function

    test('renders section headings and various input components', () => {
        render(
            <HistopathologyMalignant
                formData={formData}
                setFormData={setFormData}
                disabled={false}
            />
        )

        // Assert section headings
        const sectionHeadings = screen.getAllByRole('heading', { level: 1 })
        expect(sectionHeadings).toHaveLength(1) // Only one level 1 heading expected
        expect(sectionHeadings[0]).toHaveTextContent(
            i18n.t(formTranslationKeys.histopathology)
        )

        const subsectionHeadings = screen.getAllByRole('heading', { level: 2 })
        expect(subsectionHeadings).toHaveLength(2) // Two level 2 headings expected
        expect(subsectionHeadings[0]).toHaveTextContent(
            i18n.t(formTranslationKeys.histologicalType)
        )
        expect(subsectionHeadings[1]).toHaveTextContent(
            i18n.t(formTranslationKeys.histologicalTypeSpecification)
        )

        // Assert ConditionalCheckboxes and their options
        const conditionalCheckboxes = screen.getAllByTestId(
            'conditional-checkboxes'
        )
        expect(conditionalCheckboxes).toHaveLength(3) // Two ConditionalCheckboxes expected

        // Simulate user interaction with ConditionalCheckboxes
        const checkboxes = screen.getAllByRole('checkbox')
        fireEvent.click(checkboxes[0]) // Clicking on the first checkbox

        // Assert that setFormData is called
        expect(setFormData).toHaveBeenCalled()

        // Assert NumberInput component
        const numberInput = screen.getByText(
            'Velikost nádoru - největší rozměr (mm):'
        ) // Text label expected
        expect(numberInput).toBeVisible()

        // Assert TextInput component
        const textInput = screen.getByText(
            'Velikost nádoru - nebyla určena (vysvětlit):'
        )
        expect(textInput).toBeInTheDocument()

        // Assert SimpleCheckboxes components
        const simpleCheckboxes = screen.getAllByTestId('simple-checkboxes')
        expect(simpleCheckboxes).toHaveLength(3) // Three SimpleCheckboxes expected
    })

    test('disables input components when disabled prop is true', () => {
        render(
            <HistopathologyMalignant
                formData={formData}
                setFormData={setFormData}
                disabled={true}
            />
        )

        // Assert all input components are disabled
        const inputs = screen
            .getAllByRole('textbox')
            .concat(screen.getAllByRole('checkbox'))
        inputs.forEach((input) => {
            expect(input).toBeDisabled()
        })
    })
})
