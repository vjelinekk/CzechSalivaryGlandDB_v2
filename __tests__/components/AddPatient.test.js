import { expect } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'
import AddPatient from '../../src/frontend/components/add-patient'
import { Components } from '../../src/frontend/constants'

const MALIGNANT = 'Zhoubný nádor (maligní)'
const BENIGN = 'Nezhoubný nádor (benigní)'

const tumorTypes = [MALIGNANT, BENIGN]

describe('AddPatient component', () => {
    test('should render correctly', () => {
        const setActiveComponentMock = jest.fn()
        render(<AddPatient setActiveComponent={setActiveComponentMock} />)

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
