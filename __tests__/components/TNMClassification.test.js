import React from 'react'
import { render, screen } from '@testing-library/react'
import TNMClassification from '../../src/frontend/components/forms/tnm-classification'


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


describe('TNMClassification component', () => {
    test('renders TNM klasifikace section with two TNMClassificationCalculator components', () => {
        const formData = {
            t_klasifikace_klinicka: '',
            n_klasifikace_klinicka: '',
            m_klasifikace_klinicka: '',
            tnm_klasifikace_klinicka: '',
            t_klasifikace_patologicka: '',
            n_klasifikace_patologicka: '',
            m_klasifikace_patologicka: '',
            tnm_klasifikace_patologicka: '',
        }
        const setFormDataMock = jest.fn()
        const disabled = false

        render(
            <TNMClassification
                formData={formData}
                setFormData={setFormDataMock}
                disabled={disabled}
            />
        )

        const sectionHeading = screen.getByText(i18n.t(formTranslationKeys.tnmClassification))
        expect(sectionHeading).toBeInTheDocument()

        const clinicalSectionHeading = screen.getByText(
            'TNM klasifikace (klinická)'
        )
        expect(clinicalSectionHeading).toBeInTheDocument()

        const pathologicalSectionHeading = screen.getByText(
            'TNM klasifikace (patologická)'
        )
        expect(pathologicalSectionHeading).toBeInTheDocument()

        const tnmCalculators = screen.getAllByText(i18n.t(formTranslationKeys.tClassification))
        expect(tnmCalculators).toHaveLength(2)
    })
})
