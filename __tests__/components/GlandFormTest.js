import React from 'react'
import { render, screen } from '@testing-library/react'
import ParotidGlandForm from '../../src/frontend/components/forms/parotid/parotid-gland-form'
import SublingualGlandForm from '../../src/frontend/components/forms/sublingual/sublingual-gland-form'
import SubmandibularGlandForm from '../../src/frontend/components/forms/submandibular/submandibular-gland-form'
import { expect } from '@jest/globals'

describe('ParotidGlandForm', () => {
    const data = {} // Mocked data
    const defaultFormState = '' // Mocked defaultFormState
    const editSaved = false // Mocked editSaved
    const setEditSaved = jest.fn() // Mocked setEditSaved function
    const setActiveComponent = jest.fn() // Mocked setActiveComponent function
    const setActivePatient = jest.fn() // Mocked setActivePatient function
    const idStudie = '' // Mocked idStudie
    const defaultSelectedStudies = [] // Mocked defaultSelectedStudies

    test('renders parotid form', () => {
        window.api = {
            getStudiesByFormType: jest.fn(),
        }

        render(
            <ParotidGlandForm
                data={data}
                defaultFormState={defaultFormState}
                editSaved={editSaved}
                setEditSaved={setEditSaved}
                setActiveComponent={setActiveComponent}
                setActivePatient={setActivePatient}
                idStudie={idStudie}
                defaultSelectedStudies={defaultSelectedStudies}
            />
        )

        const headings = screen.getAllByRole('heading', { level: 1 })
        expect(headings).toHaveLength(9) // Only one level 1 heading expected
    })

    test('renders sublingual form', () => {
        window.api = {
            getStudiesByFormType: jest.fn(),
        }

        render(
            <SublingualGlandForm
                data={data}
                defaultFormState={defaultFormState}
                editSaved={editSaved}
                setEditSaved={setEditSaved}
                setActiveComponent={setActiveComponent}
                setActivePatient={setActivePatient}
                idStudie={idStudie}
                defaultSelectedStudies={defaultSelectedStudies}
            />
        )

        const headings = screen.getAllByRole('heading', { level: 1 })
        expect(headings).toHaveLength(9) // Only one level 1 heading expected
    })

    test('renders submandibular form', () => {
        window.api = {
            getStudiesByFormType: jest.fn(),
        }

        render(
            <SubmandibularGlandForm
                data={data}
                defaultFormState={defaultFormState}
                editSaved={editSaved}
                setEditSaved={setEditSaved}
                setActiveComponent={setActiveComponent}
                setActivePatient={setActivePatient}
                idStudie={idStudie}
                defaultSelectedStudies={defaultSelectedStudies}
            />
        )

        const headings = screen.getAllByRole('heading', { level: 1 })
        expect(headings).toHaveLength(9) // Only one level 1 heading expected
    })
})
