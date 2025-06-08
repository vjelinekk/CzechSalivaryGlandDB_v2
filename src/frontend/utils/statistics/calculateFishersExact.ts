function logFactorial(n: number): number {
    let result = 0;
    for (let i = 2; i <= n; i++) {
        result += Math.log(i);
    }
    return result;
}

function fisherProbability(a: number, b: number, c: number, d: number): number {
    const total = a + b + c + d;
    const logP =
        logFactorial(a + b) +
        logFactorial(c + d) +
        logFactorial(a + c) +
        logFactorial(b + d) -
        (logFactorial(a) +
            logFactorial(b) +
            logFactorial(c) +
            logFactorial(d) +
            logFactorial(total));
    return Math.exp(logP);
}

export const calculateFishersExact = (
    table: number[][],
    alpha: number
): {
    fisherTestResult: number
    isSignificant: boolean
    pValue: number
} => {
    const [a, b] = table[0];
    const [c, d] = table[1];

    const row1 = a + b;
    const row2 = c + d;
    const col1 = a + c;

    const pObserved = fisherProbability(a, b, c, d);
    let pValue = 0;

    const minA = Math.max(0, col1 - row2);
    const maxA = Math.min(row1, col1);

    for (let newA = minA; newA <= maxA; newA++) {
        const newB = row1 - newA;
        const newC = col1 - newA;
        const newD = row2 - newC;

        if (newB < 0 || newC < 0 || newD < 0) continue;

        const p = fisherProbability(newA, newB, newC, newD);
        if (p <= pObserved + 1e-10) {
            pValue += p;
        }
    }

    return {
        fisherTestResult: pObserved,
        pValue: Math.min(1, pValue),
        isSignificant: pValue <= alpha
    };
};

