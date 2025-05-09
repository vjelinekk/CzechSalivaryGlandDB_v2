import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Menu from '../../src/frontend/components/menu'
import ImportProvider from '../../src/frontend/components/import-context'
import { Components } from '../../src/frontend/constants'


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

describe('Menu component', () => {
    test('renders correctly', () => {
        const setActiveComponentMock = jest.fn()
        render(
            <ImportProvider>
                <Menu setActiveComponent={setActiveComponentMock} />
            </ImportProvider>
        )
        const menuButtons = [
            i18n.t(appTranslationKeys.patientList),
            i18n.t(appTranslationKeys.addPatient),
            i18n.t(appTranslationKeys.studies),
            i18n.t(appTranslationKeys.addStudy),
            i18n.t(appTranslationKeys.kaplanMeier),
            i18n.t(appTranslationKeys.importData),
        ]
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

        fireEvent.click(screen.getByText(i18n.t(appTranslationKeys.patientList)))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.patientsList,
        })

        fireEvent.click(screen.getByText(i18n.t(appTranslationKeys.addPatient)))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.addPatient,
        })

        fireEvent.click(screen.getByText(i18n.t(appTranslationKeys.studies)))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.studiesList,
        })

        fireEvent.click(screen.getByText(i18n.t(appTranslationKeys.addStudy)))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.addStudy,
        })

        fireEvent.click(screen.getByText(i18n.t(appTranslationKeys.kaplanMeier)))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.kaplanMeier,
        })
    })
})
