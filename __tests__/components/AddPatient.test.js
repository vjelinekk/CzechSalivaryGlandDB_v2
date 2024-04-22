import { expect } from "@jest/globals"
import { fireEvent, render, screen } from "@testing-library/react"
import AddPatient from "../../src/frontend/components/add-patient"
import { Components } from "../../src/frontend/constants"

const PRIUSNI = 'Příušní žláza'
const PODCELISTNI = 'Podčelistní žláza'
const PODJAZYKOVA = 'Podjazyková žláza'

const glands = [PRIUSNI, PODCELISTNI, PODJAZYKOVA]


describe('AddPatient component', () => {
    test('should render correctly', () => {
        const setActiveComponentMock = jest.fn()
        render(
            <AddPatient setActiveComponent={setActiveComponentMock} />
        )

        glands.forEach((gland) => {
            expect(screen.getByText(gland)).toBeInTheDocument()
        })
    })

    test('should call setActiveComponent with correct component name when a button is clicked', () => {
        const setActiveComponentMock = jest.fn()
        render(
            <AddPatient setActiveComponent={setActiveComponentMock} />
        )

        fireEvent.click(screen.getByText(PRIUSNI))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.parotidGlandForm,
        })

        fireEvent.click(screen.getByText(PODCELISTNI))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.submandibularGlandForm,
        })

        fireEvent.click(screen.getByText(PODJAZYKOVA))
        expect(setActiveComponentMock).toHaveBeenCalledWith({
            component: Components.sublingualGlandForm,
        })
    })
})