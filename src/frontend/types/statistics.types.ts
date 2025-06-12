import { NonParametricTestType } from '../enums/statistics.enums'
import { PatientType } from '../types'

export interface AgeStats {
    min: number
    max: number
    mean: number
    median: number
    standardDeviation: number
}

export interface CountPercentage {
    count: number
    percentage: string
}

export interface StatisticsData {
    totalPatients: number
    gender: {
        male: CountPercentage
        female: CountPercentage
    }
    age: AgeStats
    surgicalProcedures: Record<string, CountPercentage>
    tumorTypes: Record<string, CountPercentage>
    tnmClassificationClinical: {
        t: Record<string, CountPercentage>
        n: Record<string, CountPercentage>
        m: Record<string, CountPercentage>
        stage: Record<string, CountPercentage>
    }
    tnmClassificationPathological: {
        t: Record<string, CountPercentage>
        n: Record<string, CountPercentage>
        m: Record<string, CountPercentage>
        stage: Record<string, CountPercentage>
    }
    recurrence: {
        yes: CountPercentage
        no: CountPercentage
    }
    complications: {
        yes: CountPercentage
        no: CountPercentage
        byType: Record<string, CountPercentage>
    }
}

export interface ITTestGroups {
    first: {
        histologicalTypes: string[]
        tClassification: string[]
        nClassification: string[]
        mClassification: string[]
        persistence: string[]
        recurrence: string[]
        state: string[]
    }
    second: {
        histologicalTypes: string[]
        tClassification: string[]
        nClassification: string[]
        mClassification: string[]
        persistence: string[]
        recurrence: string[]
        state: string[]
    }
}

export interface NonParametricTestData {
    group1: PatientType[]
    group2: PatientType[]
}

export interface NonParametricTestResult {
    pValue: number
    testValue: number
    isStatisticallySignificant: boolean
    alpha: number
    type: NonParametricTestType
}
