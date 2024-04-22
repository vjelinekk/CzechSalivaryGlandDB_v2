import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Menu from '../../src/frontend/components/menu'
import ImportProvider from '../../src/frontend/components/import-context'
import { Components } from '../../src/frontend/constants'

const menuButtons = [
    'Seznam pacientů',
    'Přidat pacienta',
    'Studie',
    'Přidat studii',
    'Kaplan-Meier',
    'Importovat data',
]

describe('Menu component', () => {
    test('renders correctly', () => {
        const setActiveComponentMock = jest.fn()
        render(
            <ImportProvider>
                <Menu setActiveComponent={setActiveComponentMock} />
            </ImportProvider>
        )
        menuButtons.forEach((button) => {
            expect(screen.getByText(button)).toBeInTheDocument()
        })
    })

    test('should call setActiveComponent with correct component name when a button is clicked', () => {
        const setActiveComponentMock = jest.fn()
        render(
            <ImportProvider>
                <Menu setActiveComponent={setActiveComponentMock} />
            </ImportProvider>
        )

        fireEvent.click(screen.getByText('Seznam pacientů'))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.patientsList,
        })

        fireEvent.click(screen.getByText('Přidat pacienta'))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.addPatient,
        })

        fireEvent.click(screen.getByText('Studie'))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.studiesList,
        })

        fireEvent.click(screen.getByText('Přidat studii'))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.addStudy,
        })

        fireEvent.click(screen.getByText('Kaplan-Meier'))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.kaplanMeier,
        })
    })
})
