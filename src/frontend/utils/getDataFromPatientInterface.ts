import { PatientType } from '../types'

const getDataFromPatientInterface = (
    data: PatientType | null,
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
