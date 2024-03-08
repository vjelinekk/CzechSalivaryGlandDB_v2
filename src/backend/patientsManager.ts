import { insertRow } from './basicOperations'
import { FormType, TableNames } from './constants'

export const insertPatient = async (
    data: Record<string, string | number | string[]>
): Promise<number | null> => {
    const formType = data.form_type
    let result

    try {
        if (formType === FormType.podcelistni) {
            result = await insertRow(TableNames.podcelistni, data)
        } else if (formType === FormType.podjazykove) {
            result = await insertRow(TableNames.podjazykove, data)
        } else if (formType === FormType.priusni) {
            result = await insertRow(TableNames.priusni, data)
        }
    } catch (err) {
        result = null
    }

    return result
}
