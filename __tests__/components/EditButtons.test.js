import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import EditButtons from '../../src/frontend/components/forms/edit-buttons'
import { jest } from '@jest/globals'
import { act } from 'react-dom/test-utils'

describe('EditButtons component', () => {
    const formDataMock = {}
    const setFormDataMock = jest.fn()
    const databaseFormDataMock = {}
    const setDatabaseFormDataMock = jest.fn()
    const selectedStudiesMock = []
    const setSelectedStudiesMock = jest.fn()
    const databaseSelectedStudiesMock = []
    const setDatabaseSelectedStudiesMock = jest.fn()
    const studiesChangedMock = false
    const formErrorsMock = []
    const setFormStateMock = jest.fn()
    const setEditSavedMock = jest.fn()
    const setActivePatientMock = jest.fn()
    const idStudieMock = 1

    beforeEach(() => {
        window.api = {
            save: jest.fn().mockReturnValue(1),
        }

        render(
            <EditButtons
                formState={'edit'}
                formData={formDataMock}
                setFormData={setFormDataMock}
                databaseFormData={databaseFormDataMock}
                setDatabaseFormData={setDatabaseFormDataMock}
                selectedStudies={selectedStudiesMock}
                setSelectedStudies={setSelectedStudiesMock}
                databaseSelectedStudies={databaseSelectedStudiesMock}
                setDatabaseSelectedStudies={setDatabaseSelectedStudiesMock}
                studiesChanged={studiesChangedMock}
                formErrors={formErrorsMock}
                setFormState={setFormStateMock}
                setEditSaved={setEditSavedMock}
                setActivePatient={setActivePatientMock}
                idStudie={idStudieMock}
            />
        )
    })

    test('renders edit buttons correctly', () => {
        const editButtons = screen.getAllByRole('button')
        expect(editButtons).toHaveLength(4) // Expect 4 buttons to be rendered
    })

    test('call handleEditButtonClick', () => {
        render(
            <EditButtons
                formState={'view'}
                formData={formDataMock}
                setFormData={setFormDataMock}
                databaseFormData={databaseFormDataMock}
                setDatabaseFormData={setDatabaseFormDataMock}
                selectedStudies={selectedStudiesMock}
                setSelectedStudies={setSelectedStudiesMock}
                databaseSelectedStudies={databaseSelectedStudiesMock}
                setDatabaseSelectedStudies={setDatabaseSelectedStudiesMock}
                studiesChanged={studiesChangedMock}
                formErrors={formErrorsMock}
                setFormState={setFormStateMock}
                setEditSaved={setEditSavedMock}
                setActivePatient={setActivePatientMock}
                idStudie={idStudieMock}
            />
        )

        const editButton = screen.getByText('Editovat')
        fireEvent.click(editButton)
        expect(setFormStateMock).toHaveBeenCalledWith('edit')
    })

    test('calls handleCancelButtonClick', () => {
        const cancelButton = screen.getByText('Zrušit editaci')
        fireEvent.click(cancelButton)
        expect(setFormStateMock).toHaveBeenCalledWith('view')
        expect(setFormDataMock).toHaveBeenCalledWith(databaseFormDataMock)
        expect(setSelectedStudiesMock).toHaveBeenCalledWith(
            databaseSelectedStudiesMock
        )
    })

    test('calls handleSaveButtonClick', async () => {
        const saveButton = screen.getByText('Uložit změny')
        await act(async () => fireEvent.click(saveButton))
        expect(setEditSavedMock).toHaveBeenCalledTimes(1)
        expect(setDatabaseFormDataMock).toHaveBeenCalledWith(formDataMock)
        expect(setDatabaseSelectedStudiesMock).toHaveBeenCalledWith(
            selectedStudiesMock
        )
    })

    test('calls handleDeleteButtonClick', () => {
        const deleteButton = screen.getByText('Smazat pacienta')
        fireEvent.click(deleteButton)
        const confirmationDialog = screen.getByText(
            'Opravdu chcete smazat pacienta?'
        )
        expect(confirmationDialog).toBeInTheDocument()
    })

    test('calls handleDeleteFromStudyClick', () => {
        const deleteFromStudyButton = screen.getByText('Odebrat z studie')
        fireEvent.click(deleteFromStudyButton)
        const confirmationDialog = screen.getByText(
            'Opravdu chcete odebrat pacienta ze studie?'
        )
        expect(confirmationDialog).toBeInTheDocument()
    })
})
