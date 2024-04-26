import React from 'react'
import { render, screen } from '@testing-library/react'
import TNMClassification from '../../src/frontend/components/forms/tnm-classification'

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

        const sectionHeading = screen.getByText('TNM klasifikace')
        expect(sectionHeading).toBeInTheDocument()

        const clinicalSectionHeading = screen.getByText(
            'TNM klasifikace (klinická)'
        )
        expect(clinicalSectionHeading).toBeInTheDocument()

        const pathologicalSectionHeading = screen.getByText(
            'TNM klasifikace (patologická)'
        )
        expect(pathologicalSectionHeading).toBeInTheDocument()

        const tnmCalculators = screen.getAllByText('T-klasifikace')
        expect(tnmCalculators).toHaveLength(2)
    })
})
