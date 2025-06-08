declare module 'jstat' {
    export const jStat: {
        chisquare: {
            cdf: (x: number, df: number) => number
            inv: (p: number, df: number) => number
        }
    }
}
