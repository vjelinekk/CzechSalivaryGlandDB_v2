import { beforeEach, describe, expect, jest } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Attachments from '../../src/frontend/components/forms/attachments'

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

describe('Attachments component', () => {
    const formDataMock = {
        attachments: 'test.txt',
    }
    const setFormDataMock = jest.fn()

    beforeEach(async () => {
        window.fs = {
            getFileName: jest.fn().mockReturnValue('test.txt'),
            getFileIcon: jest.fn().mockReturnValue('test'),
            save: jest.fn().mockReturnValue('new.txt'),
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
        expect(
            screen.getByText(i18n.t(formTranslationKeys.addAttachment))
        ).toBeInTheDocument()

        const attachmentButton = screen.getByRole('button', {
            name: /test.txt/,
        })
        expect(attachmentButton).toBeInTheDocument()
    })

    test('should add attachment', async () => {
        const addButton = screen.getByText(
            i18n.t(formTranslationKeys.addAttachment)
        )
        await act(async () => {
            fireEvent.click(addButton)
        })

        expect(window.fs.save).toHaveBeenCalled()
    })
})
