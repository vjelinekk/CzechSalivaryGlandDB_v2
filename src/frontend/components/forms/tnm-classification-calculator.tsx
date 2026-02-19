import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useTnmData from '../../hooks/use-tnm-data'
import { PatientType, TnmValueDefinition } from '../../types'
import { formTranslationKeys } from '../../translations'
import EntityCheckboxes from './entity-checkboxes'

interface TNMClassificationCalculatorProps {
    tIdLabel: string
    nIdLabel: string
    mIdLabel: string
    gradeIdLabel: string
    formData: PatientType | null
    setFormData: Dispatch<SetStateAction<PatientType | null>>
    disabled: boolean
}

const TNMClassificationCalculator: React.FC<
    TNMClassificationCalculatorProps
> = ({
    tIdLabel,
    nIdLabel,
    mIdLabel,
    gradeIdLabel,
    formData,
    setFormData,
    disabled,
}) => {
    const { t } = useTranslation()
    const { tOptions, nOptions, mOptions, isLoading, calculateStage } =
        useTnmData()
    const [tnmStage, setTnmStage] = useState<TnmValueDefinition | null>(null)

    const notDeterminedLabel = t(
        formTranslationKeys.classificationNotDetermined
    )

    // Calculate stage when T, N, M IDs change
    useEffect(() => {
        const calculateCurrentStage = async () => {
            if (!formData || isLoading) return

            const tId = formData[tIdLabel] as number | undefined
            const nId = formData[nIdLabel] as number | undefined
            const mId = formData[mIdLabel] as number | undefined

            if (!tId || !nId || !mId) {
                setTnmStage(null)
                return
            }

            const stage = await calculateStage(tId, nId, mId)
            setTnmStage(stage)
        }

        calculateCurrentStage()
    }, [formData, tIdLabel, nIdLabel, mIdLabel, isLoading, calculateStage])

    // Update grade ID in formData when stage changes
    useEffect(() => {
        if (setFormData) {
            setFormData((prev) => {
                const newGradeId = tnmStage?.id ?? null
                if (prev && prev[gradeIdLabel] !== newGradeId) {
                    return {
                        ...prev,
                        [gradeIdLabel]: newGradeId,
                    }
                }
                return prev
            })
        }
    }, [tnmStage, gradeIdLabel, setFormData])

    if (isLoading) {
        return <div>{t('common.loading')}</div>
    }

    return (
        <>
            <EntityCheckboxes
                title={t(formTranslationKeys.tClassification)}
                data={formData}
                dbLabel={tIdLabel}
                setFormData={setFormData}
                disabled={disabled}
                options={tOptions}
                nullableLabel={notDeterminedLabel}
            />
            <EntityCheckboxes
                title={t(formTranslationKeys.nClassification)}
                data={formData}
                dbLabel={nIdLabel}
                setFormData={setFormData}
                disabled={disabled}
                options={nOptions}
                nullableLabel={notDeterminedLabel}
            />
            <EntityCheckboxes
                title={t(formTranslationKeys.mClassification)}
                data={formData}
                dbLabel={mIdLabel}
                setFormData={setFormData}
                disabled={disabled}
                options={mOptions}
                nullableLabel={notDeterminedLabel}
            />
            <div className="textInputDiv">
                <p>{t(formTranslationKeys.classification)}</p>
                <input
                    type="text"
                    className="textInput"
                    value={tnmStage?.code ?? ''}
                    disabled={true}
                />
            </div>
        </>
    )
}

export default TNMClassificationCalculator
