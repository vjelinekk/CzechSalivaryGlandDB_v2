import { describe, expect, test, beforeEach, jest } from '@jest/globals'
import { render, screen, fireEvent, act } from '@testing-library/react'
import ImportProvider from '../../src/frontend/components/import-context'
import PatientsList from '../../src/frontend/components/patients-list'
import { StudyType } from '../../src/frontend/constants'


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


describe('PatientsList component', () => {
    const mockPatients = [
        {
            id: '1',
            jmeno: 'John',
            prijmeni: 'Doe',
            form_type: 1,
        },
        {
            id: '2',
            jmeno: 'Jane',
            prijmeni: 'Smith',
            form_type: 2,
        },
    ]

    const notPatientButtons = 5 // Number of buttons that are not patients

    beforeEach(() => {
        window.api = {
            getFilteredPatients: jest.fn().mockResolvedValue(mockPatients),
            getStudiesByPatientId: jest.fn().mockResolvedValue([]),
            get: jest.fn().mockResolvedValue(mockPatients),
            save: jest.fn().mockResolvedValue(1),
            insert: jest.fn().mockResolvedValue(true),
        }
    })

    test('should render correctly and handle patient search', async () => {
        await act(async () => {
            render(
                <ImportProvider>
                    <PatientsList />
                </ImportProvider>
            )
        })

        // Assertion: All patients are rendered
        expect(screen.getAllByRole('button')).toHaveLength(
            mockPatients.length + notPatientButtons
        ) // Adjust the number based on your expected number of patient buttons

        // Search for a patient
        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText(i18n.t(appTranslationKeys.search)), {
                target: { value: 'John' },
            })
        })

        // Assertion: Only the matching patient is rendered
        expect(screen.getAllByRole('button')).toHaveLength(
            1 + notPatientButtons
        ) // Adjust the number based on your expected number of matching patient buttons
        expect(screen.getByText('John Doe (podčelistní)')).toBeInTheDocument() // Adjust the text based on your expected matching patient

        // Clear the search input
        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText(i18n.t(appTranslationKeys.search)), {
                target: { value: '' },
            })
        })

        // Assertion: All patients are rendered again
        expect(screen.getAllByRole('button')).toHaveLength(
            mockPatients.length + notPatientButtons
        )
    })

    test('should handle study creation', async () => {
        const setActiveComponentMock = jest.fn()

        await act(async () => {
            render(
                <ImportProvider>
                    <PatientsList
                        studyType={StudyType.special}
                        setActiveComponent={setActiveComponentMock}
                    />
                </ImportProvider>
            )
        })

        // Set study name
        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText(i18n.t(appTranslationKeys.studyNamePlaceholder)), {
                target: { value: 'Test Study' },
            })
        })

        // Click create study button
        await act(async () => {
            fireEvent.click(screen.getByText(i18n.t(appTranslationKeys.createStudyButton)))
        })

        // Assertion: Create study API function is called with correct data
        expect(window.api.save).toHaveBeenCalledWith('saveStudy', {
            typ_studie: StudyType.special,
            nazev_studie: 'Test Study',
        })
    })
})
