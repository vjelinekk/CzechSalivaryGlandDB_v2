declare module 'jstat' {
    export const jStat: {
        chisquare: {
            cdf: (x: number, df: number) => number
            inv: (p: number, df: number) => number
        }
        mean: (arr: number[]) => number
        stdev: (arr: number[], sample?: boolean) => number
        studentt: {
            cdf: (x: number, df: number) => number
        }
    }
}
