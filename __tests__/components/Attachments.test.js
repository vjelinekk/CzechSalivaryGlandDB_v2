import { beforeEach, describe, expect, jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Attachments from '../../src/frontend/components/forms/attachments'

describe('Attachments component', () => {
    const formDataMock = {
        attachments: 'test.txt'
    }
    const setFormDataMock = jest.fn()

    beforeEach(async () => {
        window.fs = {
            getFileName: jest.fn().mockReturnValue('test.txt'),
            getFileIcon: jest.fn().mockReturnValue('test'),
            save: jest.fn().mockReturnValue('new.txt')
        }

        await act(async () => {
            render(
                <Attachments
                    formData={formDataMock}
                    setFormData={setFormDataMock}
                    disabled={false}
                />
            )
        })
    })

    test('should render component correctly', async () => {
        expect(screen.getByText('Přidat přílohu')).toBeInTheDocument();

        const attachmentButton = screen.getByRole('button', { name: /test.txt/})
        expect(attachmentButton).toBeInTheDocument();
    })

    test('should add attachment', async () => {
        const addButton = screen.getByText('Přidat přílohu')
        await act(async () => {
            fireEvent.click(addButton)
        })

        expect(window.fs.save).toHaveBeenCalled();
    })
})