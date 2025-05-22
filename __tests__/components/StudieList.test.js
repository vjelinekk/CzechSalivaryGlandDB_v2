import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import StudiesList from '../../src/frontend/components/studies-list'

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

const mockStudies = [
    { id: 1, nazev_studie: 'Study1', typ_studie: 'Type1' },
    { id: 2, nazev_studie: 'Study2', typ_studie: 'Type2' },
]

describe('StudiesList component', () => {
    test('should render correctly and handle study search', async () => {
        // Mock the window.api.get function
        window.api = {
            get: jest.fn().mockResolvedValue(mockStudies),
        }

        await act(async () => {
            render(<StudiesList />)
        })

        // Assertion: All studies are rendered
        expect(screen.getAllByRole('button')).toHaveLength(
            mockStudies.length * 3
        )

        // Search for a study
        await act(async () => {
            fireEvent.change(
                screen.getByPlaceholderText(i18n.t(appTranslationKeys.search)),
                {
                    target: { value: 'Study1' },
                }
            )
        })

        // Assertion: Only the matching study is rendered
        expect(screen.getAllByRole('button')).toHaveLength(1 * 3)
        expect(screen.getByText(/Study1/)).toBeInTheDocument()

        // Clear the search input
        await act(async () => {
            fireEvent.change(
                screen.getByPlaceholderText(i18n.t(appTranslationKeys.search)),
                {
                    target: { value: '' },
                }
            )
        })

        // Assertion: All studies are rendered again
        expect(screen.getAllByRole('button')).toHaveLength(
            mockStudies.length * 3
        )
    })
})
