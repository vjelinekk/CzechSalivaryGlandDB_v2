import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { TNMClassificationResult } from '../constants'
import { PatientType } from '../types'
import getDataFromPatientInterface from '../utils/getDataFromPatientInterface'

interface useTNMClassificationProps {
    tnm: TNMClassificationResult | ''
}

interface TNMMappingType {
    [key: string]: TNMClassificationResult
}

const TNMMapping: TNMMappingType = {
    T1N0M0: TNMClassificationResult.stageI,
    T2N0M0: TNMClassificationResult.stageII,
    T3N0M0: TNMClassificationResult.stageIII,
    T1N1M0: TNMClassificationResult.stageIII,
    T2N1M0: TNMClassificationResult.stageIII,
    T3N1M0: TNMClassificationResult.stageIII,
    T1N2aM0: TNMClassificationResult.stageIVA,
    T1N2bM0: TNMClassificationResult.stageIVA,
    T1N2cM0: TNMClassificationResult.stageIVA,
    T2N2aM0: TNMClassificationResult.stageIVA,
    T2N2bM0: TNMClassificationResult.stageIVA,
    T2N2cM0: TNMClassificationResult.stageIVA,
    T3N2aM0: TNMClassificationResult.stageIVA,
    T3N2bM0: TNMClassificationResult.stageIVA,
    T3N2cM0: TNMClassificationResult.stageIVA,
    T4aN0M0: TNMClassificationResult.stageIVA,
    T4aN1M0: TNMClassificationResult.stageIVA,
    T4aN2aM0: TNMClassificationResult.stageIVA,
    T4aN2bM0: TNMClassificationResult.stageIVA,
    T4aN2cM0: TNMClassificationResult.stageIVA,
}

const calculateTNMClassification = (t: string, n: string, m: string) => {
    if (
        t === 'nebyla stanovena' ||
        n === 'nebyla stanovena' ||
        m === 'nebyla stanovena'
    ) {
        return ''
    }

    if (
        (t === 'T4b' && m === 'M0') ||
        (n === 'N3a' && m === 'M0') ||
        (n === 'N3b' && m === 'M0')
    ) {
        return TNMClassificationResult.stageIVB
    }

    if (m === 'M1') {
        return TNMClassificationResult.stageIVC
    }

    const tnmKey = `${t}${n}${m}`
    return TNMMapping[tnmKey] || ''
}

const useTNMClassification = (
    tLabel: string,
    nLabel: string,
    mLabel: string,
    tnmLabel: string,
    formData: PatientType,
    setFormData: Dispatch<SetStateAction<PatientType | null>>
): useTNMClassificationProps => {
    const [tnm, setTNM] = useState<TNMClassificationResult | ''>(
        getDataFromPatientInterface(formData, tnmLabel)
            ? (getDataFromPatientInterface(
                  formData,
                  tnmLabel
              ) as TNMClassificationResult)
            : ''
    )

    useEffect(() => {
        if (formData) {
            if (formData[tLabel] && formData[nLabel] && formData[mLabel]) {
                const t = formData[tLabel] as string
                const n = formData[nLabel] as string
                const m = formData[mLabel] as string

                setTNM(calculateTNMClassification(t, n, m))
            } else {
                setTNM('')
            }
        }
    }, [
        formData && formData[tLabel] ? formData[tLabel] : '',
        formData && formData[nLabel] ? formData[nLabel] : '',
        formData && formData[mLabel] ? formData[mLabel] : '',
    ])

    useEffect(() => {
        if (tnm) {
            setFormData((prev) => {
                if (prev) {
                    return {
                        ...prev,
                        [tnmLabel]: tnm,
                    }
                }
                return prev
            })
        }
    }, [tnm])

    return { tnm }
}

export default useTNMClassification
