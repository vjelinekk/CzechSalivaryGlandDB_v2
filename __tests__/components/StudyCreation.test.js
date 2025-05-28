import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import StudyCreation from '../../src/frontend/components/study-creation'
import { StudyType } from '../../src/frontend/constants'
import ImportProvider from '../../src/frontend/components/import-context'
import { act } from 'react-dom/test-utils'
import { expect, jest } from '@jest/globals'

import { initI18n } from '../../src/frontend/i18n'
import i18n from 'i18next'
import { appTranslationKeys } from '../../src/frontend/translations'

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

describe('StudyCreation component', () => {
    const setActiveComponentMock = jest.fn()
    const setActiveMenuButtonMock = jest.fn()

    beforeEach(async () => {
        window.api = {
            get: jest.fn().mockResolvedValue([]),
            save: jest.fn().mockResolvedValue(1),
        }

        await act(async () => {
            render(
                <ImportProvider>
                    <StudyCreation
                        setActiveComponent={setActiveComponentMock}
                        studyType={StudyType.parotid}
                        setActiveMenuButton={setActiveMenuButtonMock}
                    />
                </ImportProvider>
            )
        })
    })

    test('should render PatientsList component', () => {
        expect(screen.getByTestId('patients-list')).toBeInTheDocument()
    })

    test('should call setActiveComponent when PatientsList component is clicked', async () => {
        // Find the input element within the TextField component
        const studyNameInput = screen
            .getByTestId('study-name-input')
            .querySelector('input')
        fireEvent.change(studyNameInput, { target: { value: 'Test' } })
        expect(studyNameInput.value).toBe('Test')

        await act(async () => {
            fireEvent.click(
                screen.getByText(i18n.t(appTranslationKeys.createStudyButton))
            )
        })

        expect(setActiveComponentMock).toHaveBeenCalled()
    })
})
