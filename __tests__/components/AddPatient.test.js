import { expect } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'
import AddPatient from '../../src/frontend/components/add-patient'
import { Components } from '../../src/frontend/constants'


import { initI18n } from '../../src/frontend/i18n'
import i18n from 'i18next'
import { appTranslationKeys } from '../../src/frontend/translations'

let MALIGNANT
let BENIGN

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
    
    MALIGNANT = i18n.t(appTranslationKeys.malignantTumor)
    BENIGN = i18n.t(appTranslationKeys.benignTumor)
});


describe('AddPatient component', () => {
    test('should render correctly', () => {
        const setActiveComponentMock = jest.fn()
        render(<AddPatient setActiveComponent={setActiveComponentMock} />)
        const tumorTypes = [MALIGNANT, BENIGN]
        
        tumorTypes.forEach((type) => {
            expect(screen.getByText(type)).toBeInTheDocument()
        })
    })

    test('should call setActiveComponent with correct component name when a button is clicked', () => {
        const setActiveComponentMock = jest.fn()
        render(<AddPatient setActiveComponent={setActiveComponentMock} />)

        fireEvent.click(screen.getByText(MALIGNANT))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.addPatientMalignant,
        })

        fireEvent.click(screen.getByText(BENIGN))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.addPatientMalignant,
        })
    })
})
