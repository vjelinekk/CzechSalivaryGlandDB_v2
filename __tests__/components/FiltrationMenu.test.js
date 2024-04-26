import { describe, expect, test } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'
import FiltrationMenu from '../../src/frontend/components/filtration-menu'
import { StudyType } from '../../src/frontend/constants'

describe('FiltrationMenu component', () => {
    test('should render correctly and reset filters on close', () => {
        const setOpenFilterMenuMock = jest.fn()
        const setFilteredColumnsMock = jest.fn()
        const setIsFilteredMock = jest.fn()
        const filteredColumns = {
            form_type: ['example_form_type'],
            histopatologie_vysledek: ['example_histopatologie'],
            typ_terapie: ['example_typ_terapie'],
        }

        render(
            <FiltrationMenu
                openFilterMenu={true}
                setOpenFilterMenu={setOpenFilterMenuMock}
                filteredColumns={filteredColumns}
                setFilteredColumns={setFilteredColumnsMock}
                studyType={StudyType.special}
                setIsFiltered={setIsFilteredMock}
            />
        )

        // Assertions for AppBar buttons
        fireEvent.click(screen.getByLabelText('close'))
        expect(setOpenFilterMenuMock).toHaveBeenCalled()
        expect(setOpenFilterMenuMock).toHaveBeenCalledWith(false)
        expect(setFilteredColumnsMock).toHaveBeenCalledWith(filteredColumns)

        fireEvent.click(screen.getByText('Resetovat filtr'))
        expect(setFilteredColumnsMock).toHaveBeenCalledWith({
            form_type: [],
            histopatologie_vysledek: [],
            typ_terapie: [],
        })

        // Assertions for "Uložit filtr" button
        fireEvent.click(screen.getByText('Uložit filtr'))
        expect(setOpenFilterMenuMock).toHaveBeenCalledWith(false)
        expect(setIsFilteredMock).toHaveBeenCalledWith(true)
    })
})
