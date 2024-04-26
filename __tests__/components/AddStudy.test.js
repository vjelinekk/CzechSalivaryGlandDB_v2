import { expect } from '@jest/globals'
import { render, fireEvent, screen } from '@testing-library/react'
import AddStudy from '../../src/frontend/components/add-study'
import { Components, StudyType } from '../../src/frontend/constants'

const PRIUSNI_STUDIE = 'Nová studie Příušních žláz'
const PODCELISTNI_STUDIE = 'Nová studie Podčelistních žláz'
const PODJAZYKOVA_STUDIE = 'Nová studie Podjazykových žláz'
const SPECIALNI_STUDIE = 'Nová studie Speciální studie'

const studies = [
    PRIUSNI_STUDIE,
    PODCELISTNI_STUDIE,
    PODJAZYKOVA_STUDIE,
    SPECIALNI_STUDIE,
]

describe('AddStudy component', () => {
    test('should render correctly', () => {
        const setActiveComponentMock = jest.fn()
        render(<AddStudy setActiveComponent={setActiveComponentMock} />)

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
