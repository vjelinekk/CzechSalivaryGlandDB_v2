import {
    NonParametricTestData,
    NonParametricTestResult,
} from '../../../frontend/types/statistics.types'
import {
    NonParametricTestType,
    NonParametricTestValue,
} from '../../../frontend/enums/statistics.enums'
import { PatientType } from '../../../frontend/types'

// Type for value with rank and group flag
type RankedValue = {
    value: number
    group: 1 | 2
    rank?: number
}

export const calculateUTest = (
    selectedTestType: NonParametricTestType,
    selectedValue: NonParametricTestValue,
    tTestData: NonParametricTestData,
    alpha = 0.05
): NonParametricTestResult => {
    const group1 = extractNumericValues(tTestData.group1, selectedValue)
    const group2 = extractNumericValues(tTestData.group2, selectedValue)

    if (group1.length < 2 || group2.length < 2) {
        return {
            pValue: NaN,
            testValue: NaN,
            isStatisticallySignificant: false,
            alpha,
            type: selectedTestType,
        }
    }

    // Combine data with group flag
    const combined: RankedValue[] = [
        ...group1.map((v) => ({ value: v, group: 1 as const })),
        ...group2.map((v) => ({ value: v, group: 2 as const })),
    ]

    // Sort by value
    combined.sort((a, b) => a.value - b.value)

    // Assign ranks (average for ties)
    let i = 0
    while (i < combined.length) {
        let j = i + 1
        while (j < combined.length && combined[j].value === combined[i].value)
            j++

        const avgRank = (i + j + 1) / 2
        for (let k = i; k < j; k++) {
            combined[k].rank = avgRank
        }

        i = j
    }

    // Sum ranks by group
    const R1 = combined
        .filter((item) => item.group === 1)
        .reduce((sum, item) => sum + (item.rank ?? 0), 0)
    const R2 = combined
        .filter((item) => item.group === 2)
        .reduce((sum, item) => sum + (item.rank ?? 0), 0)

    const n1 = group1.length
    const n2 = group2.length

    const U1 = R1 - (n1 * (n1 + 1)) / 2
    const U2 = R2 - (n2 * (n2 + 1)) / 2
    const U = Math.min(U1, U2)

    // Normal approximation
    const meanU = (n1 * n2) / 2
    const stdU = Math.sqrt((n1 * n2 * (n1 + n2 + 1)) / 12)

    // Edge case: stdU is zero (all values are the same)
    if (stdU === 0) {
        return {
            pValue: NaN,
            testValue: U,
            isStatisticallySignificant: false,
            alpha,
            type: selectedTestType,
        }
    }

    const z = (U - meanU) / stdU

    // Support one-sided and two-sided tests
    let pValue: number
    switch (selectedTestType) {
        case NonParametricTestType.ONE_TAILED_LEFT: // group1 > group2
            pValue = 1 - normalCDF(z)
            break
        case NonParametricTestType.ONE_TAILED_RIGHT: // group1 < group2
            pValue = normalCDF(z)
            break
        case NonParametricTestType.TWO_TAILED:
        default:
            pValue = 2 * Math.min(normalCDF(z), 1 - normalCDF(z))
            break
    }

    // Edge case: pValue is NaN or out of [0,1]
    if (!isFinite(pValue) || pValue < 0 || pValue > 1) {
        return {
            pValue: NaN,
            testValue: U,
            isStatisticallySignificant: false,
            alpha,
            type: selectedTestType,
        }
    }

    return {
        pValue,
        testValue: U,
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

const normalCDF = (z: number): number => {
    return (1 + erf(z / Math.SQRT2)) / 2
}

const erf = (x: number): number => {
    const sign = x < 0 ? -1 : 1
    x = Math.abs(x)

    const a1 = 0.254829592
    const a2 = -0.284496736
    const a3 = 1.421413741
    const a4 = -1.453152027
    const a5 = 1.061405429
    const p = 0.3275911

    const t = 1 / (1 + p * x)
    const y =
        1 -
        ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)

    return sign * y
}
