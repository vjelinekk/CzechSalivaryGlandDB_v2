import { expect } from '@jest/globals'
import { render, fireEvent, screen } from '@testing-library/react'
import AddStudy from '../../src/frontend/components/add-study'
import { Components, StudyType } from '../../src/frontend/constants'

import { initI18n } from '../../src/frontend/i18n'
import i18n from 'i18next'
import { appTranslationKeys } from '../../src/frontend/translations'

let PRIUSNI_STUDIE, PODCELISTNI_STUDIE, PODJAZYKOVA_STUDIE, SPECIALNI_STUDIE

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
    PRIUSNI_STUDIE = i18n.t(appTranslationKeys.newStudyParotid)
    PODCELISTNI_STUDIE = i18n.t(appTranslationKeys.newStudySubmandibular)
    PODJAZYKOVA_STUDIE = i18n.t(appTranslationKeys.newStudySublingual)
    SPECIALNI_STUDIE = i18n.t(appTranslationKeys.newStudySpecial)
})

describe('AddStudy component', () => {
    test('should render correctly', () => {
        const setActiveComponentMock = jest.fn()
        render(<AddStudy setActiveComponent={setActiveComponentMock} />)
        const studies = [
            PRIUSNI_STUDIE,
            PODCELISTNI_STUDIE,
            PODJAZYKOVA_STUDIE,
            SPECIALNI_STUDIE,
        ]

        studies.forEach((study) => {
            expect(screen.getByText(study)).toBeInTheDocument()
        })
    })

    test('should call setActiveComponent with correct component name when a button is clicked', () => {
        const setActiveComponentMock = jest.fn()
        render(<AddStudy setActiveComponent={setActiveComponentMock} />)

        fireEvent.click(screen.getByText(PRIUSNI_STUDIE))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.study,
            studyType: StudyType.parotid,
        })

        fireEvent.click(screen.getByText(PODCELISTNI_STUDIE))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.study,
            studyType: StudyType.submandibular,
        })

        fireEvent.click(screen.getByText(PODJAZYKOVA_STUDIE))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.study,
            studyType: StudyType.sublingual,
        })

        fireEvent.click(screen.getByText(SPECIALNI_STUDIE))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.study,
            studyType: StudyType.special,
        })
    })
})
