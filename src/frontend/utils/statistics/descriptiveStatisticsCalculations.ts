import {
    CountPercentage,
    StatisticsData,
} from '../../../frontend/types/statistics.types'
import { PatientType } from '../../../frontend/types'

/**
 * Calculates descriptive statistics from an array of patients.
 *
 * @param patients - Array of patients
 * @returns - Object containing statistics data
 */
export const calculateStatistics = (
    patients: PatientType[]
): StatisticsData => {
    if (!patients || patients.length === 0) {
        throw new Error('No patient data available')
    }

    const totalPatients = patients.length

    let maleCount = 0
    let femaleCount = 0

    let ageSum = 0
    let ageCount = 0
    let ageMin = Infinity
    let ageMax = -Infinity
    const ageArray: number[] = []

    const surgicalProcedures: Record<string, number> = {}
    const tumorTypes: Record<string, number> = {}

    const tClassificationClinical: Record<string, number> = {}
    const nClassificationClinical: Record<string, number> = {}
    const mClassificationClinical: Record<string, number> = {}
    const tnmStageClinical: Record<string, number> = {}

    const tClassificationPathological: Record<string, number> = {}
    const nClassificationPathological: Record<string, number> = {}
    const mClassificationPathological: Record<string, number> = {}
    const tnmStagePathological: Record<string, number> = {}

    let recurrenceYes = 0
    let recurrenceNo = 0

    let complicationsYes = 0
    let complicationsNo = 0
    const complicationTypes: Record<string, number> = {}

    for (const p of patients) {
        // Gender
        if (p.pohlavi === 'Muž') maleCount++
        else if (p.pohlavi === 'Žena') femaleCount++

        // Age
        const age = Number(p.vek_pri_diagnoze)
        if (!isNaN(age)) {
            ageSum += age
            ageCount++
            ageMin = Math.min(ageMin, age)
            ageMax = Math.max(ageMax, age)
            ageArray.push(age)
        }

        // Surgical procedures
        const proc = p.rozsah_chirurgicke_lecby?.trim()
        if (proc) surgicalProcedures[proc] = (surgicalProcedures[proc] || 0) + 1

        // Tumor types
        const tumor = p.histopatologie_vysledek?.trim()
        if (tumor) tumorTypes[tumor] = (tumorTypes[tumor] || 0) + 1

        // TNM Classification Clinical
        const tClinical = (p.t_klasifikace_klinicka as string)?.trim()
        if (tClinical)
            tClassificationClinical[tClinical] =
                (tClassificationClinical[tClinical] || 0) + 1
        const nClinical = (p.n_klasifikace_klinicka as string)?.trim()
        if (nClinical)
            nClassificationClinical[nClinical] =
                (nClassificationClinical[nClinical] || 0) + 1
        const mClinical = (p.m_klasifikace_klinicka as string)?.trim()
        if (mClinical)
            mClassificationClinical[mClinical] =
                (mClassificationClinical[mClinical] || 0) + 1
        const stageClinical = (p.tnm_klasifikace_klinicka as string)?.trim()
        if (stageClinical)
            tnmStageClinical[stageClinical] =
                (tnmStageClinical[stageClinical] || 0) + 1
        // TNM Classification Pathological
        const tPath = (p.t_klasifikace_patologicka as string)?.trim()
        if (tPath)
            tClassificationPathological[tPath] =
                (tClassificationPathological[tPath] || 0) + 1
        const nPath = (p.n_klasifikace_patologicka as string)?.trim()
        if (nPath)
            nClassificationPathological[nPath] =
                (nClassificationPathological[nPath] || 0) + 1
        const mPath = (p.m_klasifikace_patologicka as string)?.trim()
        if (mPath)
            mClassificationPathological[mPath] =
                (mClassificationPathological[mPath] || 0) + 1
        const stagePathological = (
            p.tnm_klasifikace_patologicka as string
        )?.trim()
        if (stagePathological)
            tnmStagePathological[stagePathological] =
                (tnmStagePathological[stagePathological] || 0) + 1

        // Recurrence
        if (p.recidiva === 'Ano') recurrenceYes++
        else if (p.recidiva === 'Ne') recurrenceNo++

        const complicationType = p.pooperacni_komplikace
            ? (p.pooperacni_komplikace as string)?.trim()
            : null
        console.log(complicationType)

        // Complications
        if (complicationType) {
            if (complicationType === 'Nejsou') {
                complicationsNo++
            } else {
                complicationsYes++
                complicationTypes[complicationType] =
                    (complicationTypes[complicationType] || 0) + 1
            }
        }
    }

    // Age statistics
    const ageMean = ageSum / ageCount
    const sortedAges = ageArray.sort((a, b) => a - b)
    const medianIndex = Math.floor(ageArray.length / 2)
    const ageMedian =
        ageArray.length % 2 === 0
            ? (sortedAges[medianIndex - 1] + sortedAges[medianIndex]) / 2
            : sortedAges[medianIndex]
    const variance =
        ageArray.reduce((sum, a) => sum + Math.pow(a - ageMean, 2), 0) /
        ageCount
    const ageStdDev = Math.sqrt(variance)

    // Helper functions
    const toCountPercentage = (count: number): CountPercentage => ({
        count,
        percentage: `${((count / totalPatients) * 100).toFixed(1)}%`,
    })

    const mapToCountPercentage = (
        obj: Record<string, number>
    ): Record<string, CountPercentage> => {
        const result: Record<string, CountPercentage> = {}
        for (const [key, count] of Object.entries(obj)) {
            result[key] = toCountPercentage(count)
        }
        return result
    }

    return {
        totalPatients,
        gender: {
            male: toCountPercentage(maleCount),
            female: toCountPercentage(femaleCount),
        },
        age: {
            min: ageMin,
            max: ageMax,
            mean: parseFloat(ageMean.toFixed(1)),
            median: parseFloat(ageMedian.toFixed(1)),
            standardDeviation: parseFloat(ageStdDev.toFixed(1)),
        },
        surgicalProcedures: mapToCountPercentage(surgicalProcedures),
        tumorTypes: mapToCountPercentage(tumorTypes),
        tnmClassificationClinical: {
            t: mapToCountPercentage(tClassificationClinical),
            n: mapToCountPercentage(nClassificationClinical),
            m: mapToCountPercentage(mClassificationClinical),
            stage: mapToCountPercentage(tnmStageClinical),
        },
        tnmClassificationPathological: {
            t: mapToCountPercentage(tClassificationPathological),
            n: mapToCountPercentage(nClassificationPathological),
            m: mapToCountPercentage(mClassificationPathological),
            stage: mapToCountPercentage(tnmStagePathological),
        },
        recurrence: {
            yes: toCountPercentage(recurrenceYes),
            no: toCountPercentage(recurrenceNo),
        },
        complications: {
            yes: toCountPercentage(complicationsYes),
            no: toCountPercentage(complicationsNo),
            byType: mapToCountPercentage(complicationTypes),
        },
    }
}
