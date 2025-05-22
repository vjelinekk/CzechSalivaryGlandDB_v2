import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import EditResult from '../../src/frontend/components/forms/edit-result'

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

describe('EditResult component', () => {
    test('renders edit success message', async () => {
        const editSavedMock = { done: true, saved: true }
        const setEditSavedMock = jest.fn()

        render(
            <EditResult
                editSaved={editSavedMock}
                setEditSaved={setEditSavedMock}
            />
        )

        const editSuccessMessage = await screen.findByText(
            i18n.t(formTranslationKeys.changeSaved)
        )
        expect(editSuccessMessage).toBeInTheDocument()
    })

    test('renders edit error message', async () => {
        const editSavedMock = { done: true, saved: false }
        const setEditSavedMock = jest.fn()

        render(
            <EditResult
                editSaved={editSavedMock}
                setEditSaved={setEditSavedMock}
            />
        )

        const editErrorMessage = await screen.findByText(
            i18n.t(formTranslationKeys.changeSaveError)
        )
        expect(editErrorMessage).toBeInTheDocument()
    })

    test('clears edit saved state after timeout', async () => {
        jest.useFakeTimers()
        const editSavedMock = { done: true, saved: true }
        const setEditSavedMock = jest.fn()

        render(
            <EditResult
                editSaved={editSavedMock}
                setEditSaved={setEditSavedMock}
            />
        )

        jest.advanceTimersByTime(2000)
        await waitFor(() => {
            expect(setEditSavedMock).toHaveBeenCalled()
        })
    })

    test('does not render anything if editSaved is false', () => {
        const editSavedMock = null
        const setEditSavedMock = jest.fn()

        render(
            <EditResult
                editSaved={editSavedMock}
                setEditSaved={setEditSavedMock}
            />
        )

        const editSuccessMessage = screen.queryByText(
            i18n.t(formTranslationKeys.changeSaved)
        )
        const editErrorMessage = screen.queryByText(
            i18n.t(formTranslationKeys.changeSaveError)
        )
        expect(editSuccessMessage).toBeNull()
        expect(editErrorMessage).toBeNull()
    })
})
