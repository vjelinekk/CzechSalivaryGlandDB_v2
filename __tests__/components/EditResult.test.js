import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import EditResult from '../../src/frontend/components/forms/edit-result'

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

        const editSuccessMessage = await screen.findByText('Změna uložena')
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
            'Nastala chyba při ukládání změny'
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

        const editSuccessMessage = screen.queryByText('Změna uložena')
        const editErrorMessage = screen.queryByText(
            'Nastala chyba při ukládání změny'
        )
        expect(editSuccessMessage).toBeNull()
        expect(editErrorMessage).toBeNull()
    })
})
