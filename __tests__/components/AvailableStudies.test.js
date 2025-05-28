import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AvailableStudies from '../../src/frontend/components/forms/available-studies'
import { act } from 'react-dom/test-utils'
import { beforeEach, jest } from '@jest/globals'
import { FormType } from '../../src/frontend/constants'

import { initI18n } from '../../src/frontend/i18n'
import i18n from 'i18next'
import { appTranslationKeys } from '../../src/frontend/translations'

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

describe('AvailableStudies', () => {
    const mockStudies = [
        { id: 1, nazev_studie: 'Study 1' },
        { id: 2, nazev_studie: 'Study 2' },
        { id: 3, nazev_studie: 'Study 3' },
    ]

    beforeEach(() => {
        window.api = {
            getStudiesByFormType: jest.fn().mockReturnValue(mockStudies),
        }
    })

    test('renders the component', async () => {
        await act(async () => {
            render(
                <AvailableStudies
                    formType={FormType.priusni}
                    selectedStudies={[]}
                    setStudiesChanged={jest.fn()}
                    setSelectedStudies={jest.fn()}
                    disabled={false}
                />
            )
        })

        expect(
            screen.getByText(i18n.t(appTranslationKeys.studies))
        ).toBeInTheDocument()
        expect(screen.getByRole('table')).toBeInTheDocument()
    })

    test('displays the list of studies', async () => {
        await act(async () => {
            render(
                <AvailableStudies
                    formType={FormType.priusni}
                    selectedStudies={[]}
                    setStudiesChanged={jest.fn()}
                    setSelectedStudies={jest.fn()}
                    disabled={false}
                />
            )
        })

        mockStudies.forEach((study) => {
            expect(screen.getByText(study.nazev_studie)).toBeInTheDocument()
        })
    })

    test('handles checkbox change', async () => {
        const setSelectedStudies = jest.fn()
        const setStudiesChanged = jest.fn()

        await act(async () => {
            render(
                <AvailableStudies
                    formType={FormType.priusni}
                    selectedStudies={[]}
                    setStudiesChanged={setStudiesChanged}
                    setSelectedStudies={setSelectedStudies}
                    disabled={false}
                />
            )
        })

        const cell = screen.getByRole('cell', { name: 'Study 1' })
        const checkbox = cell.querySelector('input[type="checkbox"]')
        await act(async () => {
            fireEvent.click(checkbox)
        })

        expect(setSelectedStudies).toHaveBeenCalledWith([
            { id: 1, nazev_studie: 'Study 1' },
        ])
        expect(setStudiesChanged).toHaveBeenCalledWith(true)
    })
})
