import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import EditButtons from '../../src/frontend/components/forms/edit-buttons'
import { jest } from '@jest/globals'
import { act } from 'react-dom/test-utils'

import { initI18n } from '../../src/frontend/i18n'
import i18n from 'i18next'
import { formTranslationKeys } from '../../src/frontend/translations'

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
        // Clear all mocks
        jest.clearAllMocks()

        window.api = {
            save: jest.fn().mockReturnValue(1),
            delete: jest.fn().mockReturnValue(true),
            deletePatientFromStudy: jest.fn().mockReturnValue(true),
            updatePatientsStudies: jest.fn().mockReturnValue(true),
        }
    })

    test('renders edit buttons correctly', () => {
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

        // Initially only the expand/collapse button is visible
        const editButtons = screen.getAllByRole('button')
        expect(editButtons).toHaveLength(1) // Only expand button visible initially

        // Click to expand and show all buttons
        fireEvent.click(editButtons[0])

        // Now all buttons should be visible (expand + cancel + save + delete + removeFromStudy)
        const expandedButtons = screen.getAllByRole('button')
        expect(expandedButtons).toHaveLength(5) // All buttons visible after expansion
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

        // First expand the buttons
        const expandButton = screen.getAllByRole('button')[0]
        fireEvent.click(expandButton)

        const editButton = screen.getByText(
            i18n.t(formTranslationKeys.editPatient)
        )
        fireEvent.click(editButton)
        expect(setFormStateMock).toHaveBeenCalledWith('edit')
    })

    test('calls handleCancelButtonClick', () => {
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

        // First expand the buttons
        const expandButton = screen.getAllByRole('button')[0]
        fireEvent.click(expandButton)

        const cancelButton = screen.getByText(
            i18n.t(formTranslationKeys.cancelEdit)
        )
        fireEvent.click(cancelButton)
        expect(setFormStateMock).toHaveBeenCalledWith('view')
        expect(setFormDataMock).toHaveBeenCalledWith(databaseFormDataMock)
        expect(setSelectedStudiesMock).toHaveBeenCalledWith(
            databaseSelectedStudiesMock
        )
    })

    test('calls handleSaveButtonClick', async () => {
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

        // First expand the buttons
        const expandButton = screen.getAllByRole('button')[0]
        fireEvent.click(expandButton)

        const saveButton = screen.getByText(
            i18n.t(formTranslationKeys.saveChanges)
        )
        await act(async () => fireEvent.click(saveButton))
        expect(setEditSavedMock).toHaveBeenCalledTimes(1)
        expect(setDatabaseFormDataMock).toHaveBeenCalledWith(formDataMock)
        expect(setDatabaseSelectedStudiesMock).toHaveBeenCalledWith(
            selectedStudiesMock
        )
    })

    test('calls handleDeleteButtonClick', () => {
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

        // First expand the buttons
        const expandButton = screen.getAllByRole('button')[0]
        fireEvent.click(expandButton)

        const deleteButton = screen.getByText(
            i18n.t(formTranslationKeys.deletePatient)
        )
        fireEvent.click(deleteButton)
        const confirmationDialog = screen.getByText(
            'Opravdu chcete smazat pacienta?'
        )
        expect(confirmationDialog).toBeInTheDocument()
    })

    test('calls handleDeleteFromStudyClick', () => {
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

        // First expand the buttons
        const expandButton = screen.getAllByRole('button')[0]
        fireEvent.click(expandButton)

        const deleteFromStudyButton = screen.getByText(
            i18n.t(formTranslationKeys.removeFromStudy)
        )
        fireEvent.click(deleteFromStudyButton)
        const confirmationDialog = screen.getByText(
            i18n.t(formTranslationKeys.confirmRemoveFromStudy)
        )
        expect(confirmationDialog).toBeInTheDocument()
    })

    test('expand/collapse functionality works correctly', () => {
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

        // Initially collapsed - only expand button visible
        const initialButtons = screen.getAllByRole('button')
        expect(initialButtons).toHaveLength(1)

        // Click to expand
        fireEvent.click(initialButtons[0])

        // Now all buttons should be visible
        const expandedButtons = screen.getAllByRole('button')
        expect(expandedButtons).toHaveLength(5) // expand + cancel + save + delete + removeFromStudy

        // Click to collapse again
        fireEvent.click(expandedButtons[0])

        // Should be back to only expand button visible
        const collapsedButtons = screen.getAllByRole('button')
        expect(collapsedButtons).toHaveLength(1)
    })
})
