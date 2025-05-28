import { describe, expect, test } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'
import FiltrationMenu from '../../src/frontend/components/filtration-menu'
import { StudyType } from '../../src/frontend/constants'

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

describe('FiltrationMenu component', () => {
    test('should render correctly and reset filters on close', () => {
        const setOpenFilterMenuMock = jest.fn()
        const setFilteredColumnsMock = jest.fn()
        const setIsFilteredMock = jest.fn()
        const filteredColumns = {
            form_type: [],
            histopatologie_vysledek: [],
            typ_terapie: [],
            perzistence: null,
            pohlavi: null,
            recidiva: null,
            stav: null,
            typ_nadoru: null,
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

        fireEvent.click(
            screen.getByText(i18n.t(formTranslationKeys.resetFilter))
        )
        expect(setFilteredColumnsMock).toHaveBeenCalledWith({
            form_type: [],
            histopatologie_vysledek: [],
            typ_terapie: [],
            perzistence: null,
            pohlavi: null,
            recidiva: null,
            stav: null,
            typ_nadoru: null,
        })

        // Assertions for i18n.t(formTranslationKeys.saveFilter) button
        fireEvent.click(
            screen.getByText(i18n.t(formTranslationKeys.saveFilter))
        )
        expect(setOpenFilterMenuMock).toHaveBeenCalledWith(false)
        expect(setIsFilteredMock).toHaveBeenCalledWith(true)
    })
})
