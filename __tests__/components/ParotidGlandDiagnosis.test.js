import { render, screen } from '@testing-library/react'
import ParotidMalignantGlandDiagnosis from '../../src/frontend/components/forms/parotid/malignant/parotid-malignant-gland-diagnosis.tsx'


import { initI18n } from '../../src/frontend/i18n'
import i18n from 'i18next'
import { formTranslationKeys } from '../../src/frontend/translations'


beforeAll(async () => {
    global.window = Object.create(window);
    window.fs = {
        loadJson: (filePath) => {
            const fs = require('fs');
            const path = require('path');
            const fullPath = path.resolve(__dirname, '../../', filePath);
            return new Promise((resolve, reject) => {
                fs.readFile(fullPath, 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(data));
                    }
                });
            });
        },
    };

    await initI18n();
});


describe('ParotidGlandDiagnosis', () => {
    const formData = {} // Mocked formData
    const setFormData = jest.fn() // Mocked setFormData function

    test('renders section headings and various input components', () => {
        render(
            <ParotidMalignantGlandDiagnosis
                formData={formData}
                setFormData={setFormData}
                disabled={false}
            />
        )

        // Assert section headings
        const sectionHeadings = screen.getAllByRole('heading', { level: 1 })
        expect(sectionHeadings).toHaveLength(1) // Only one level 1 heading expected
        expect(sectionHeadings[0]).toHaveTextContent(i18n.t(formTranslationKeys.diagnosisTitle))

        // Assert DatePicker component
        const datePicker = screen.getByText('Rok diagnózy:')
        expect(datePicker).toBeInTheDocument()

        // Assert SimpleCheckboxes components
        const simpleCheckboxes = screen.getAllByTestId('simple-checkboxes')
        expect(simpleCheckboxes).toHaveLength(4) // Four SimpleCheckboxes expected

        // Assert ConditionalCheckboxes components
        const conditionalCheckboxes = screen.getAllByTestId(
            'conditional-checkboxes'
        )
        expect(conditionalCheckboxes).toHaveLength(3) // Three ConditionalCheckboxes expected
    })

    test('disables input components when disabled prop is true', () => {
        render(
            <ParotidMalignantGlandDiagnosis
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

    // Add more tests as needed for other functionalities of ParotidGlandDiagnosis
})
