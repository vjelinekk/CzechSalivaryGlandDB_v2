import React, { Dispatch, SetStateAction } from 'react'
import useTNMClassification from '../../hooks/use-tnm-classification'
import { PatientType } from '../../types'
import SimpleCheckboxes from './simple-checkboxes'

interface TNMClassificationCalculatorProps {
    tLabel: string
    nLabel: string
    mLabel: string
    tnmLabel: string
    formData: PatientType | null
    setFormData: Dispatch<SetStateAction<PatientType | null>>
    disabled: boolean
}

const TNMClassificationCalculator: React.FC<
    TNMClassificationCalculatorProps
> = ({ tLabel, nLabel, mLabel, tnmLabel, formData, setFormData, disabled }) => {
    const { tnm } = useTNMClassification(
        tLabel,
        nLabel,
        mLabel,
        tnmLabel,
        formData,
        setFormData
    )

    return (
        <>
            <SimpleCheckboxes
                title="T-klasifikace"
                data={formData}
                dbLabel={tLabel}
                enableSingleSelect={true}
                setFormData={setFormData}
                disabled={disabled}
                options={[
                    'TX',
                    'T1',
                    'T2',
                    'T3',
                    'T4a',
                    'T4b',
                    'nebyla stanovena',
                ]}
            />
            <SimpleCheckboxes
                title="N-klasifikace"
                data={formData}
                dbLabel={nLabel}
                enableSingleSelect={true}
                setFormData={setFormData}
                disabled={disabled}
                options={[
                    'N0',
                    'N1',
                    'N2a',
                    'N2b',
                    'N2c',
                    'N3a',
                    'N3b',
                    'nebyla stanovena',
                ]}
            />
            <SimpleCheckboxes
                title="M-klasifikace"
                data={formData}
                dbLabel={mLabel}
                enableSingleSelect={true}
                setFormData={setFormData}
                disabled={disabled}
                options={['M0', 'M1', 'nebyla stanovena']}
            />
            <div className="textInputDiv">
                <p>Klasifikace: </p>
                <input
                    type="text"
                    className="textInput"
                    value={tnm}
                    disabled={true}
                />
            </div>
        </>
    )
}

export default TNMClassificationCalculator
