import { describe, expect, test } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import KaplanMeierFilter from '../../src/frontend/components/kaplan-meier-filter'
import { KaplanMeierType } from '../../src/frontend/constants'

import { initI18n } from '../../src/frontend/i18n'
import i18n from 'i18next'
import { appTranslationKeys } from '../../src/frontend/translations'

beforeAll(async () => {
    global.window = Object.create(window)
    window.fs = {
        loadJson: (filePath) => {
            const fs = require('fs')
            const path = require('path')
            const fullPath = path.resolve(__dirname, '../../', filePath)
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

const mockKaplanMeierWindow = {
    api: {
        getKaplanMeierData: jest.fn(),
    },
}

describe('KaplanMeierFilter component', () => {
    test('should render correctly and handle curve type change', () => {
        const setKaplanMeierData = jest.fn()
        const setSelectedCurveType = jest.fn()
        act(() => {
            Object.defineProperty(window, 'api', {
                value: mockKaplanMeierWindow.api,
            })

            render(
                <KaplanMeierFilter
                    setKaplanMeierData={setKaplanMeierData}
                    selectedCurveType={KaplanMeierType.survival}
                    setSelectedCurveType={setSelectedCurveType}
                />
            )
        })

        // Assertions
        expect(
            screen.getByText(i18n.t(appTranslationKeys.curveTypeSelection))
        ).toBeInTheDocument()
        expect(
            screen.getByLabelText(i18n.t(appTranslationKeys.survivalCurve))
        ).toBeInTheDocument()
        expect(
            screen.getByLabelText(i18n.t(appTranslationKeys.recidiveCurve))
        ).toBeInTheDocument()

        // Simulate curve type change
        fireEvent.click(
            screen.getByLabelText(i18n.t(appTranslationKeys.recidiveCurve))
        )

        // Assertion on callback function
        expect(setSelectedCurveType).toHaveBeenCalledWith(
            KaplanMeierType.recidive
        )
    })
})
