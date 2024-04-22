import { describe, expect, jest } from "@jest/globals";
import { act, render, screen, waitFor } from "@testing-library/react";
import App from "../../src/frontend/components/app";

const mockWindowEncryptionDisabled = {
    encryption: {
        isPasswordSet: jest.fn(),
        generateEncryptionKey: jest.fn(),
        isEncryptionEnabled: jest.fn().mockReturnValue(false),
        validatePassword: jest.fn(),
        insertPasswordRow: jest.fn(),
        insertUsingEncryption: jest.fn(),
        setEncryptionKey: jest.fn(),
    }
};


describe('App component', () => {
    test('should render correctly when encryption is false', () => {
        act(() => {
            Object.defineProperty(window, 'encryption', {
                value: mockWindowEncryptionDisabled.encryption,
                writable: true
            });

            render(
                <App />
            )
        })

        waitFor(() => 
            expect(screen.getByText("Přihlášení do databáze")).toBeInTheDocument(),
            expect(screen.getByText("Chcete používat zabezpečenou databázi?")).toBeInTheDocument(),
            expect(screen.getByText("Ano")).toBeInTheDocument(),
            expect(screen.getByText("Ne")).toBeInTheDocument(),
        )
    })

    test('should render encryption setup', () => {
        act(() => {
            Object.defineProperty(window, 'encryption', {
                value: mockWindowEncryptionDisabled.encryption,
                writable: true
            });

            render(
                <App />
            )
        })

        waitFor(() => 
            expect(screen.getByText("Přihlášení do databáze")).toBeInTheDocument(),
        )

        act(() => {
            screen.getByText("Ano").click()
        })

        act(() => {
            screen.getByText("Pokračovat").click()
        })

        waitFor(() => 
            expect(screen.getByText("Tvorba hesla")).toBeInTheDocument(),
            expect(screen.getByText("Nové heslo")).toBeInTheDocument(),
            expect(screen.getByText("Tvorba klíče k databázi")).toBeInTheDocument(),
            expect(screen.getByText("Přihlásit se")).toBeInTheDocument(),
        )
    })
}) 