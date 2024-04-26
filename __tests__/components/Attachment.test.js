import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Attachment from '../../src/frontend/components/forms/attachment'
import { expect, jest } from '@jest/globals'
import { act } from 'react-dom/test-utils'

describe('Attachment component', () => {
    const filePathMock = 'example/filepath.txt'
    const setFormDataMock = jest.fn()

    beforeEach(async () => {
        window.fs = {
            getFileIcon: jest.fn().mockReturnValue('file-icon'),
            getFileName: jest.fn().mockReturnValue('filepath.txt'),
            open: jest.fn(),
        }
    })

    test('renders the file name correctly', async () => {
        await act(async () => {
            render(
                <Attachment
                    filePath={filePathMock}
                    setFormData={setFormDataMock}
                    disabled={false}
                />
            )
        })

        expect(screen.getByText('filepath.txt')).toBeInTheDocument()
    })

    test('calls handleButtonClick when button is clicked', async () => {
        await act(async () => {
            render(
                <Attachment
                    filePath={filePathMock}
                    setFormData={setFormDataMock}
                    disabled={false}
                />
            )
        })

        const fileOpen = jest.spyOn(window.fs, 'open')

        await act(async () => {
            fireEvent.click(screen.getByText('filepath.txt'))
        })

        expect(fileOpen).toHaveBeenCalled()
    })

    test('calls handleDeleteAttachment when delete button is clicked', async () => {
        await act(async () => {
            render(
                <Attachment
                    filePath={filePathMock}
                    setFormData={setFormDataMock}
                    disabled={false}
                />
            )
        })

        const deleteButton = screen.getByTestId('delete-attachment-button')
        await act(async () => {
            fireEvent.click(deleteButton)
        })

        expect(setFormDataMock).toHaveBeenCalled()
    })

    test('disables the delete button when disabled prop is true', async () => {
        await act(async () => {
            render(
                <Attachment
                    filePath={filePathMock}
                    setFormData={setFormDataMock}
                    disabled={true}
                />
            )
        })

        const deleteButton = screen.getByTestId('delete-attachment-button')
        expect(deleteButton).toBeDisabled()
    })
})
