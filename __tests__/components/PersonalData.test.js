import React from 'react'
import { render, screen } from '@testing-library/react'
import PersonalData from '../../src/frontend/components/forms/personal-data'
import calculatePackYears from '../../src/frontend/utils/calculatePackYears'

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

        const sectionHeading = screen.getByText(
            i18n.t(formTranslationKeys.anamnesticPersonalData)
        )
        expect(sectionHeading).toBeInTheDocument()

        const basicInfoHeading = screen.getByText(
            i18n.t(formTranslationKeys.basicInformation)
        )
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

        const genderCheckbox = screen.getByText(
            i18n.t(formTranslationKeys.patientGender)
        )
        expect(genderCheckbox).toBeInTheDocument()

        const demographicInfoCheckbox = screen.getByText(
            i18n.t(formTranslationKeys.demographicInfoResidencyRegion)
        )
        expect(demographicInfoCheckbox).toBeInTheDocument()

        const otherTumorsCheckbox = screen.getByText(
            i18n.t(formTranslationKeys.otherCancerInOa)
        )
        expect(otherTumorsCheckbox).toBeInTheDocument()

        const otherSalivaryCheckbox = screen.getByText(
            i18n.t(formTranslationKeys.otherSalivaryGlandDiseaseInOa)
        )
        expect(otherSalivaryCheckbox).toBeInTheDocument()

        const smokingCheckbox = screen.getByText(
            i18n.t(formTranslationKeys.smoking)
        )
        expect(smokingCheckbox).toBeInTheDocument()

        const alcoholAbuseCheckbox = screen.getByText(
            i18n.t(formTranslationKeys.alcoholAbuse)
        )
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
