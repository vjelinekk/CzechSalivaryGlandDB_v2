import React from 'react'
import { PatientData } from '../../types'
import getDataFromPatientInterface from '../../utils/getDataFromPatientInterface'
import NumberInput from './number-input'
import { dbLabels } from '../../constants'

interface PackYearsProps {
    data: PatientData | null
    setFormData: React.Dispatch<React.SetStateAction<PatientData | null>>
    disabled: boolean
}

const PackYears: React.FC<PackYearsProps> = ({
    data,
    setFormData,
    disabled,
}) => {
    const calculatePackYears = () => {
        const cigarsPerDay = Number(
            getDataFromPatientInterface(data, dbLabels.pocet_cigaret_denne)
        )
        const years = Number(
            getDataFromPatientInterface(data, dbLabels.jak_dlouho_kouri)
        )
        if (cigarsPerDay && years) {
            return (cigarsPerDay * years) / 20
        } else {
            return ''
        }
    }

    return (
        <>
            <NumberInput
                label="Počet cigaret denně"
                dbLabel={dbLabels.pocet_cigaret_denne}
                setFormData={setFormData}
                data={getDataFromPatientInterface(
                    data,
                    dbLabels.pocet_cigaret_denne
                )}
                disabled={disabled}
            />
            <NumberInput
                label="Jak dlouho (roky): "
                dbLabel={dbLabels.jak_dlouho_kouri}
                setFormData={setFormData}
                data={getDataFromPatientInterface(
                    data,
                    dbLabels.jak_dlouho_kouri
                )}
                disabled={disabled}
            />
            <div className="textInputDiv">
                <p>Počet balíčko roků: </p>
                <input
                    type="number"
                    className="textInput"
                    disabled
                    value={
                        getDataFromPatientInterface(
                            data,
                            dbLabels.pocet_balickoroku
                        ) == ''
                            ? calculatePackYears()
                            : getDataFromPatientInterface(
                                  data,
                                  dbLabels.pocet_balickoroku
                              )
                    }
                />
            </div>
        </>
    )
}

export default PackYears
