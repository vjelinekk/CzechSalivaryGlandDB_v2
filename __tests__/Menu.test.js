/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Menu from '../src/frontend/components/menu'
import ImportProvider from '../src/frontend/components/import-context'
import { describe, expect, it, jest } from '@jest/globals'
import { Components } from '../src/frontend/constants'

describe('Menu component', () => {
    it('should call setActiveComponent with correct component name when a button is clicked', () => {
        const setActiveComponentMock = jest.fn()
        const { getByText } = render(
            <ImportProvider>
                <Menu setActiveComponent={setActiveComponentMock} />
            </ImportProvider>
        )

        fireEvent.click(getByText('Seznam pacientů'))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.patientsList,
        })

        fireEvent.click(getByText('Přidat pacienta'))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.addPatient,
        })

        fireEvent.click(getByText('Studie'))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.studiesList,
        })

        fireEvent.click(getByText('Přidat studii'))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.addStudy,
        })
    })
})
