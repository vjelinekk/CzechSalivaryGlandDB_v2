import React, { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import useTNMClassification from '../../hooks/use-tnm-classification'
import { PatientType } from '../../types'
import SimpleCheckboxes from './simple-checkboxes'
import { formTranslationKeys } from '../../translations'

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
    const { t } = useTranslation()

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
                title={t(formTranslationKeys.tClassification)}
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
                    t(formTranslationKeys.classificationNotDetermined),
                ]}
            />
            <SimpleCheckboxes
                title={t(formTranslationKeys.nClassification)}
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
                    t(formTranslationKeys.classificationNotDetermined),
                ]}
            />
            <SimpleCheckboxes
                title={t(formTranslationKeys.mClassification)}
                data={formData}
                dbLabel={mLabel}
                enableSingleSelect={true}
                setFormData={setFormData}
                disabled={disabled}
                options={['M0', 'M1', t(formTranslationKeys.classificationNotDetermined)]}
            />
            <div className="textInputDiv">
                <p>{t(formTranslationKeys.classification)}</p>
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
