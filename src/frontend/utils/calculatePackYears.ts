import { dbLabels } from '../constants'
import { PatientType } from '../types'
import getDataFromPatientInterface from './getDataFromPatientInterface'

const calculatePackYears = (formData: PatientType): number | '' => {
    const cigarsPerDay = Number(
        getDataFromPatientInterface(formData, dbLabels.pocet_cigaret_denne)
    )
    const years = Number(
        getDataFromPatientInterface(formData, dbLabels.jak_dlouho_kouri)
    )
    if (cigarsPerDay && years) {
        return (cigarsPerDay * years) / 20
    } else {
        return ''
    }
}

export default calculatePackYears
