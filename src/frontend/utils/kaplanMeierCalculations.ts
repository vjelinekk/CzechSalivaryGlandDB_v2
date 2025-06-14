import {
    KaplanMeierCurveData,
    KaplanMeierData,
    KaplanMeierPatientData,
    KaplanMeierCurveRecord,
    KaplanMeierTableRowWithProb,
    KaplanMeierTimeMap,
} from '../types'

export const calculateKaplanMeierCurveData = (
    kaplanMeierData: KaplanMeierData
): KaplanMeierCurveData => {
    const groups = Object.keys(kaplanMeierData)
    const kaplanMeierCurveData: KaplanMeierCurveData = {}

    groups.forEach((group) => {
        const kaplanMeierCurveRecords = calculateKaplanMeierCurveRecords(
            kaplanMeierData[group]
        )

        kaplanMeierCurveData[group] = kaplanMeierCurveRecords
    })

    return kaplanMeierCurveData
}

const calculateKaplanMeierCurveRecords = (
    kaplanMeierPatientsData: KaplanMeierPatientData[]
): KaplanMeierCurveRecord[] => {
    return buildKaplanMeierTable(kaplanMeierPatientsData).map((row) => ({
        time: row.time,
        probability: row.probability,
    }))
}

// Helper: Parse patient data into time points
function parsePatientTimePoints(
    kaplanMeierPatientsData: KaplanMeierPatientData[]
): Array<{ time: number; isEvent: boolean }> {
    const points: Array<{ time: number; isEvent: boolean }> = []
    for (const patient of kaplanMeierPatientsData) {
        if (!patient.start_date) continue
        const startDate = new Date(patient.start_date)
        let endDate: Date
        let isEvent = false
        if (patient.event_date) {
            endDate = new Date(patient.event_date)
            isEvent = true
        } else if (patient.last_follow_up_date) {
            endDate = new Date(patient.last_follow_up_date)
        } else {
            endDate = startDate
        }
        const time =
            (endDate.getTime() - startDate.getTime()) /
            (1000 * 60 * 60 * 24 * 365)
        if (!isFinite(time) || time < 0) continue
        points.push({ time, isEvent })
    }
    return points
}

// Helper: Aggregate time points into a time map
function aggregateTimePoints(
    points: Array<{ time: number; isEvent: boolean }>
): KaplanMeierTimeMap {
    const timeMap: KaplanMeierTimeMap = {}
    for (const { time, isEvent } of points) {
        if (!timeMap[time]) timeMap[time] = { event: 0, censor: 0 }
        if (isEvent) timeMap[time].event++
        else timeMap[time].censor++
    }
    return timeMap
}

// Helper: Sort unique times
function sortTimePoints(timeMap: KaplanMeierTimeMap): number[] {
    return Object.keys(timeMap)
        .map(Number)
        .sort((a, b) => a - b)
}

// Helper: Build table rows from time map and sorted times
function buildTableRows(
    timeMap: KaplanMeierTimeMap,
    sortedTimes: number[],
    totalPatients: number
): KaplanMeierTableRowWithProb[] {
    let timeZeroEvents = 0
    let timeZeroCensorings = 0
    if (timeMap[0]) {
        timeZeroEvents = timeMap[0].event
        timeZeroCensorings = timeMap[0].censor
        delete timeMap[0]
    }
    const table: KaplanMeierTableRowWithProb[] = [
        {
            time: 0,
            events_occured: timeZeroEvents,
            censorings_occured: timeZeroCensorings,
            number_at_risk: totalPatients,
            probability: 1,
        },
    ]
    let numberAtRisk = totalPatients - timeZeroEvents - timeZeroCensorings
    let prevProb = 1
    for (let i = 1; i < sortedTimes.length; i++) {
        const time = sortedTimes[i]
        const { event, censor } = timeMap[time]
        const prob =
            numberAtRisk > 0
                ? prevProb * ((numberAtRisk - event) / numberAtRisk)
                : prevProb
        table.push({
            time,
            events_occured: event,
            censorings_occured: censor,
            number_at_risk: numberAtRisk,
            probability: prob,
        })
        prevProb = prob
        numberAtRisk -= event + censor
    }
    return table
}

// Build a table for Kaplan-Meier calculation with time, events, censorings, number at risk, and probability
const buildKaplanMeierTable = (
    kaplanMeierPatientsData: KaplanMeierPatientData[]
): KaplanMeierTableRowWithProb[] => {
    const points = parsePatientTimePoints(kaplanMeierPatientsData)
    const timeMap = aggregateTimePoints(points)
    const sortedTimes = sortTimePoints(timeMap)
    const totalPatients = points.length
    return buildTableRows(timeMap, sortedTimes, totalPatients)
}
