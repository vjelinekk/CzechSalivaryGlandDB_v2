import { describe, expect } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'
import FiltrationCheckbox from '../../src/frontend/components/filtration-checkbox'
import { FormType } from '../../src/frontend/constants'


import { initI18n } from '../../src/frontend/i18n'
import i18n from 'i18next'
import { formTranslationKeys, appTranslationKeys } from '../../src/frontend/translations'


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


describe('FiltrationCheckbox component', () => {
    test('should render form_type filter checkbox correctly', () => {
        const setFilteredColumnsMock = jest.fn()
        const filteredColumns = {
            form_type: [],
            histopatologie_vysledek: [],
            typ_terapie: [],
        }

        render(
            <FiltrationCheckbox
                label={i18n.t(formTranslationKeys.submandibular)}
                dbValue={FormType.podcelistni}
                filterLabel="form_type"
                filteredColumns={filteredColumns}
                setFilteredColumns={setFilteredColumnsMock}
            />
        )

        expect(screen.getByText(i18n.t(formTranslationKeys.submandibular))).toBeInTheDocument()
        fireEvent.click(screen.getByText(i18n.t(formTranslationKeys.submandibular)))
        expect(setFilteredColumnsMock).toBeCalled()
        expect(
            screen.getByRole('checkbox', { name: i18n.t(formTranslationKeys.submandibular) })
        ).toHaveProperty('checked', true)

        fireEvent.click(screen.getByText(i18n.t(formTranslationKeys.submandibular)))
        expect(setFilteredColumnsMock).toBeCalled()
        expect(
            screen.getByRole('checkbox', { name: i18n.t(formTranslationKeys.submandibular) })
        ).toHaveProperty('checked', false)
    })

    test('should render other than form_type filter checkbox correctly', () => {
        const setFilteredColumnsMock = jest.fn()
        const filteredColumns = {
            form_type: [],
            histopatologie_vysledek: [],
            typ_terapie: [],
        }

        render(
            <FiltrationCheckbox
                label={i18n.t(appTranslationKeys.other)}
                dbValue={i18n.t(appTranslationKeys.other)}
                filterLabel="histopatologie_vysledek"
                filteredColumns={filteredColumns}
                setFilteredColumns={setFilteredColumnsMock}
            />
        )

        expect(screen.getByText(i18n.t(appTranslationKeys.other))).toBeInTheDocument()
        fireEvent.click(screen.getByText(i18n.t(appTranslationKeys.other)))
        expect(setFilteredColumnsMock).toBeCalled()
        expect(screen.getByRole('checkbox', { name: i18n.t(appTranslationKeys.other) })).toHaveProperty(
            'checked',
            true
        )

        fireEvent.click(screen.getByText(i18n.t(appTranslationKeys.other)))
        expect(setFilteredColumnsMock).toBeCalled()
        expect(screen.getByRole('checkbox', { name: i18n.t(appTranslationKeys.other) })).toHaveProperty(
            'checked',
            false
        )
    })
})
