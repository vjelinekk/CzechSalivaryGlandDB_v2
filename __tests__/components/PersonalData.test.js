import React from 'react'
import { render, screen } from '@testing-library/react'
import PersonalData from '../../src/frontend/components/forms/personal-data'
import calculatePackYears from '../../src/frontend/utils/calculatePackYears'

describe('PersonalData component', () => {
    test('renders the section headings and form inputs', () => {
        const formData = {
            jmeno: '',
            prijmeni: '',
            id_pacient: '',
            rodne_cislo: '',
            vek_pri_diagnoze: 0,
            pohlavi: '',
            kraj: '',
            jine_nadorove_onemocneni_v_oa: '',
            specifikace_mista_vyskytu_jineho_karcinomu: '',
            jine_onemocneni_velkych_slinnych_zlaz_v_oa: '',
            specifikace_onemocneni: '',
            koureni: '',
            pocet_cigaret_denne: 0,
            jak_dlouho_kouri: 0,
            pocet_balickoroku: 0,
            abusus_alkoholu: '',
        }
        const setFormDataMock = jest.fn()
        const setFormErrorsMock = jest.fn()
        const disabled = false

        render(
            <PersonalData
                formData={formData}
                setFormData={setFormDataMock}
                setFormErrors={setFormErrorsMock}
                disabled={disabled}
            />
        )

        const sectionHeading = screen.getByText('ANAMNESTICKÁ/PERSONÁLNÍ DATA')
        expect(sectionHeading).toBeInTheDocument()

        const basicInfoHeading = screen.getByText('Základní informace')
        expect(basicInfoHeading).toBeInTheDocument()

        const nameInput = screen.getByText('Jméno:')
        expect(nameInput).toBeInTheDocument()

        const surnameInput = screen.getByText('Příjmení:')
        expect(surnameInput).toBeInTheDocument()

        const pidInput = screen.getByText('Identifikační kód pacienta:')
        expect(pidInput).toBeInTheDocument()

        const rcInput = screen.getByText('RČ (bez lomítka):')
        expect(rcInput).toBeInTheDocument()

        const ageInput = screen.getByText('Věk pacienta v době diagnózy:')
        expect(ageInput).toBeInTheDocument()

        const genderCheckbox = screen.getByText('Pohlaví pacienta')
        expect(genderCheckbox).toBeInTheDocument()

        const demographicInfoCheckbox = screen.getByText(
            'Demografické informace - kraj trvalého bydliště pacienta'
        )
        expect(demographicInfoCheckbox).toBeInTheDocument()

        const otherTumorsCheckbox = screen.getByText(
            'Jiné nádorové onemocnění v OA'
        )
        expect(otherTumorsCheckbox).toBeInTheDocument()

        const otherSalivaryCheckbox = screen.getByText(
            'Jiné onemocnění velkých slinných žláz v OA'
        )
        expect(otherSalivaryCheckbox).toBeInTheDocument()

        const smokingCheckbox = screen.getByText('Kouření')
        expect(smokingCheckbox).toBeInTheDocument()

        const alcoholAbuseCheckbox = screen.getByText('Abusus alkoholu')
        expect(alcoholAbuseCheckbox).toBeInTheDocument()
    })

    test('should test pack years calculation', () => {
        const result = calculatePackYears({
            pocet_cigaret_denne: 20,
            jak_dlouho_kouri: 20,
        })

        expect(result).toBe(20)

        const result2 = calculatePackYears({
            pocet_cigaret_denne: '',
            jak_dlouho_kouri: '',
        })

        expect(result2).toBe('')
    })
})
