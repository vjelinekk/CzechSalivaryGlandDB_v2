import { jStat } from 'jstat'

/**
 * Calculates χ² (chi-squared) statistic for a given contingency table.
 * @param table MxN contingency table, where M is the number of rows and N is the number of columns.
 * @param alpha Significance level (e.g., 0.05 for 5% significance level).
 */
export function chiSquareTest(
    table: number[][],
    alpha: number
): {
    chiSquared: number
    degreesOfFreedom: number
    pValue: number
    criticalValue: number
    isSignificant: boolean
} {
    const numRows = table.length - 1
    const numCols = table[0].length - 1

    const rowSums = table.slice(0, numRows).map((row) => row[numCols])
    const colSums = table[numRows].slice(0, numCols)
    const total = table[numRows][numCols]

    let chiSquared = 0
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const expected = (rowSums[i] * colSums[j]) / total
            const observed = table[i][j]
            chiSquared += (observed - expected) ** 2 / expected
        }
    }

    const degreesOfFreedom = (numRows - 1) * (numCols - 1)
    const pValue = 1 - jStat.chisquare.cdf(chiSquared, degreesOfFreedom)
    const criticalValue = jStat.chisquare.inv(1 - alpha, degreesOfFreedom)
    const isSignificant = pValue <= alpha

    return {
        chiSquared,
        degreesOfFreedom,
        pValue,
        criticalValue,
        isSignificant,
    }
}
