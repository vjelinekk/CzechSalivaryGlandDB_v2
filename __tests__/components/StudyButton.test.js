import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import StudyButton from '../../src/frontend/components/study-button'
import { StudyType, studyTypeToStringMap } from '../../src/frontend/constants'
import { beforeEach, expect } from '@jest/globals'

describe('StudyButton component', () => {
    const mockStudy = {
        id: 1,
        nazev_studie: 'Test Study',
        typ_studie: StudyType.parotid,
    }

    beforeEach(() => {
        window.api = {
            save: jest.fn().mockResolvedValue(1),
        }
    })

    test('should render correctly and handle study name editing', async () => {
        const setActiveStudyMock = jest.fn()
        const setListChangedMock = jest.fn()

        await act(async () => {
            render(
                <StudyButton
                    defaultStudy={mockStudy}
                    isActiveStudy={false}
                    setActiveStudy={setActiveStudyMock}
                    setListChanged={setListChangedMock}
                />
            )
        })

        // Assertion: Study name is displayed correctly
        expect(
            screen.getByText(
                `Test Study (${studyTypeToStringMap[StudyType.parotid]})`
            )
        ).toBeInTheDocument()

        // Edit study name
        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'Edit' }))
        })

        // Assertion: Edit mode is activated
        expect(screen.getByRole('textbox')).toBeInTheDocument()

        // Change study name
        await act(async () => {
            fireEvent.change(screen.getByRole('textbox'), {
                target: { value: 'New Test Study' },
            })
        })

        // Save study name
        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'Check' }))
        })

        // Assertion: Study name is updated
        expect(
            screen.getByText(
                `New Test Study (${studyTypeToStringMap[StudyType.parotid]})`
            )
        ).toBeInTheDocument()

        // Cancel study name edit
        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'Edit' }))
        })

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'Close' }))
        })

        // Assertion: Edit mode is deactivated
        expect(
            screen.getByText(
                `Test Study (${studyTypeToStringMap[StudyType.parotid]})`
            )
        ).toBeInTheDocument()
    })

    test('should handle study deletion', async () => {
        const setActiveStudyMock = jest.fn()
        const setListChangedMock = jest.fn()

        await act(async () => {
            render(
                <StudyButton
                    defaultStudy={mockStudy}
                    isActiveStudy={false}
                    setActiveStudy={setActiveStudyMock}
                    setListChanged={setListChangedMock}
                />
            )
        })

        // Click on delete button
        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'Delete' }))
        })

        // Assertion: Confirmation dialog is displayed
        expect(
            screen.getByText('Opravdu chcete smazat tuto studii?')
        ).toBeInTheDocument()

        // Click on cancel delete button
        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'Zrušit' }))
        })

        expect(
            screen.queryByRole('dialog', {
                name: 'Opravdu chcete smazat tuto studii?',
            })
        ).not.toBeVisible()
    })
})
