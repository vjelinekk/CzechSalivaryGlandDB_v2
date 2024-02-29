import { PatientData } from '../types'

const getDataFromPatientInterface = (
    data: PatientData | null,
    dbLabel: string
) => {
    if (data) {
        if (data[dbLabel] !== undefined) {
            return data[dbLabel]
        }
    }
    return ''
}

export default getDataFromPatientInterface
