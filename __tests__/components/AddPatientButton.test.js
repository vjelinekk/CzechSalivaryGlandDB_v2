import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AddPatientButton from '../../src/frontend/components/forms/add-patient-button'
import { FormStates } from '../../src/frontend/constants'
import { jest } from '@jest/globals'
import { act } from 'react-dom/test-utils'

import { initI18n } from '../../src/frontend/i18n'
import i18n from 'i18next'
import {
    formTranslationKeys,
    appTranslationKeys,
} from '../../src/frontend/translations'

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

describe('AddPatientButton component', () => {
    const setActiveComponentMock = jest.fn()
    const setActiveMenuButtonMock = jest.fn()

    const formDataMock = {
        // Your mock data for formData
    }
    const selectedStudiesMock = [
        // Your mock data for selectedStudies
    ]
    const formErrorsMock = []

    test('should render the button correctly', () => {
        render(
            <AddPatientButton
                formState={FormStates.add}
                formData={formDataMock}
                selectedStudies={selectedStudiesMock}
                formErrors={formErrorsMock}
                setActiveComponent={setActiveComponentMock}
                setActiveMenuButton={setActiveMenuButtonMock}
            />
        )
        expect(
            screen.getByText(i18n.t(appTranslationKeys.addPatient))
        ).toBeInTheDocument()
    })

    test('should call setActiveComponent and handleButtonClick when button is clicked', async () => {
        window.api = {
            save: jest.fn().mockResolvedValue(1),
            insert: jest.fn(),
        }

        render(
            <AddPatientButton
                formState={FormStates.add}
                formData={formDataMock}
                selectedStudies={selectedStudiesMock}
                formErrors={formErrorsMock}
                setActiveComponent={setActiveComponentMock}
                setActiveMenuButton={setActiveMenuButtonMock}
            />
        )

        await act(async () => {
            fireEvent.click(
                screen.getByText(i18n.t(appTranslationKeys.addPatient))
            )
        })

        expect(setActiveComponentMock).toHaveBeenCalled()
    })

    test('should be disabled when formErrors has length > 0', () => {
        render(
            <AddPatientButton
                formState={FormStates.add}
                formData={formDataMock}
                selectedStudies={selectedStudiesMock}
                formErrors={['Error']}
                setActiveComponent={setActiveComponentMock}
                setActiveMenuButton={setActiveMenuButtonMock}
            />
        )
        const button = screen.getByText(i18n.t(appTranslationKeys.addPatient))
        expect(button).toBeDisabled()
    })
})
