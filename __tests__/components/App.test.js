import { describe, expect, jest } from '@jest/globals'
import { act, render, screen, waitFor } from '@testing-library/react'
import App from '../../src/frontend/components/app'


import { initI18n } from '../../src/frontend/i18n'
import i18n from 'i18next'
import { appTranslationKeys } from '../../src/frontend/translations'


beforeAll(async () => {
    global.window = Object.create(window);
    window.fs = {
        loadJson: (filePath) => {
            const fs = require('fs');
            const path = require('path');
            const fullPath = path.resolve(__dirname, '../../', filePath);
            return new Promise((resolve, reject) => {
                fs.readFile(fullPath, 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(data));
                    }
                });
            });
        },
    };

    await initI18n();
});


const mockWindowEncryptionDisabled = {
    encryption: {
        isPasswordSet: jest.fn(),
        generateEncryptionKey: jest.fn(),
        isEncryptionEnabled: jest.fn().mockReturnValue(false),
        validatePassword: jest.fn(),
        insertPasswordRow: jest.fn(),
        insertUsingEncryption: jest.fn(),
        setEncryptionKey: jest.fn(),
    },
}

describe('App component', () => {
    test('should render correctly when encryption is false', () => {
        act(() => {
            Object.defineProperty(window, 'encryption', {
                value: mockWindowEncryptionDisabled.encryption,
                writable: true,
            })

            render(<App />)
        })

        waitFor(
            () =>
                expect(
                    screen.getByText(i18n.t(appTranslationKeys.loginTitle))
                ).toBeInTheDocument(),
            expect(
                screen.getByText(i18n.t(appTranslationKeys.useSecureDb))
            ).toBeInTheDocument(),
            expect(screen.getByText(i18n.t(appTranslationKeys.yes))).toBeInTheDocument(),
            expect(screen.getByText(i18n.t(appTranslationKeys.no))).toBeInTheDocument()
        )
    })

    test('should render encryption setup', () => {
        act(() => {
            Object.defineProperty(window, 'encryption', {
                value: mockWindowEncryptionDisabled.encryption,
                writable: true,
            })

            render(<App />)
        })

        waitFor(() =>
            expect(
                screen.getByText(i18n.t(appTranslationKeys.loginTitle))
            ).toBeInTheDocument()
        )

        act(() => {
            screen.getByText(i18n.t(appTranslationKeys.yes)).click()
        })

        act(() => {
            screen.getByText(i18n.t(appTranslationKeys.continue)).click()
        })

        waitFor(
            () => expect(screen.getByText(i18n.t(appTranslationKeys.createPassword))).toBeInTheDocument(),
            expect(screen.getByText(i18n.t(appTranslationKeys.newPassword))).toBeInTheDocument(),
            expect(
                screen.getByText(i18n.t(appTranslationKeys.createDbKey))
            ).toBeInTheDocument(),
            expect(screen.getByText(i18n.t(appTranslationKeys.login))).toBeInTheDocument()
        )
    })
})
