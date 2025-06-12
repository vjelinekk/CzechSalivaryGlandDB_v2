import { jStat } from 'jstat'
import {
    NonParametricTestData,
    NonParametricTestResult,
} from '../../../frontend/types/statistics.types'
import {
    NonParametricTestType,
    NonParametricTestValue,
} from '../../../frontend/enums/statistics.enums'
import { PatientType } from '../../../frontend/types'

export const calculateTTest = (
    selectedTestType: NonParametricTestType,
    selectedValue: NonParametricTestValue,
    tTestData: NonParametricTestData,
    alpha = 0.05
): NonParametricTestResult => {
    const group1Values = extractNumericValues(tTestData.group1, selectedValue)
    const group2Values = extractNumericValues(tTestData.group2, selectedValue)

    // Edge case: not enough data
    if (group1Values.length < 2 || group2Values.length < 2) {
        return {
            pValue: NaN,
            testValue: NaN,
            isStatisticallySignificant: false,
            alpha,
            type: selectedTestType,
        }
    }

    const mean1 = jStat.mean(group1Values)
    const mean2 = jStat.mean(group2Values)
    const s1 = jStat.stdev(group1Values, true) // true => sample stdev
    const s2 = jStat.stdev(group2Values, true)
    const n1 = group1Values.length
    const n2 = group2Values.length

    // Edge case: zero variance (stddev = 0) or division by zero
    if (s1 === 0 && s2 === 0) {
        return {
            pValue: NaN,
            testValue: NaN,
            isStatisticallySignificant: false,
            alpha,
            type: selectedTestType,
        }
    }
    if (n1 <= 1 || n2 <= 1) {
        return {
            pValue: NaN,
            testValue: NaN,
            isStatisticallySignificant: false,
            alpha,
            type: selectedTestType,
        }
    }

    const t = (mean1 - mean2) / Math.sqrt(s1 ** 2 / n1 + s2 ** 2 / n2)

    const denominator =
        (s1 ** 2 / n1) ** 2 / (n1 - 1) + (s2 ** 2 / n2) ** 2 / (n2 - 1)
    // Edge case: denominator for df is zero
    if (denominator === 0) {
        return {
            pValue: NaN,
            testValue: t,
            isStatisticallySignificant: false,
            alpha,
            type: selectedTestType,
        }
    }

    const df = (s1 ** 2 / n1 + s2 ** 2 / n2) ** 2 / denominator

    let pValue: number

    switch (selectedTestType) {
        case NonParametricTestType.ONE_TAILED_LEFT: // testuje, zda group1 > group2
            pValue = 1 - jStat.studentt.cdf(t, df)
            break
        case NonParametricTestType.ONE_TAILED_RIGHT: // testuje, zda group1 < group2
            pValue = jStat.studentt.cdf(t, df)
            break
        case NonParametricTestType.TWO_TAILED: // testuje, zda se průměry liší
        default:
            pValue = 2 * (1 - jStat.studentt.cdf(Math.abs(t), df))
            break
    }

    // Edge case: pValue is NaN or out of [0,1]
    if (!isFinite(pValue) || pValue < 0 || pValue > 1) {
        return {
            pValue: NaN,
            testValue: t,
            isStatisticallySignificant: false,
            alpha,
            type: selectedTestType,
        }
    }

    return {
        pValue,
        testValue: t,
        isStatisticallySignificant: pValue < alpha,
        alpha,
        type: selectedTestType,
    }
}

const extractNumericValues = (
    group: PatientType[],
    key: NonParametricTestValue
): number[] => {
    return group
        .map((patient) => Number(patient[key]))
        .filter((val) => !isNaN(val))
}
