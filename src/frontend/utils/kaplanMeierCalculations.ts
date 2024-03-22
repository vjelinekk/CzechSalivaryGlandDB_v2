import {
    KaplanMeierCurveData,
    KaplanMeierData,
    KaplanMeierPatientData,
    KaplanMeierCurveRecord,
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

const getSortedEventTimesMap = (
    kaplanMeierPatientsData: KaplanMeierPatientData[]
): Map<number, number> => {
    const eventTimesMap: Map<number, number> = new Map()

    kaplanMeierPatientsData.forEach((kmPatientData) => {
        const startDate = new Date(kmPatientData.start_date)
        const eventDate = new Date(kmPatientData.event_date)

        const time =
            (eventDate.getTime() - startDate.getTime()) /
            (1000 * 60 * 60 * 24 * 365)

        if (eventTimesMap.has(time)) {
            const currentValue = eventTimesMap.get(time)
            if (currentValue !== undefined) {
                eventTimesMap.set(time, currentValue + 1)
            }
        } else {
            eventTimesMap.set(time, 1)
        }
    })

    // Sort the map by keys
    const sortedEventTimesMap = new Map(
        [...eventTimesMap.entries()].sort((a, b) => a[0] - b[0])
    )

    return sortedEventTimesMap
}

const calculateKaplanMeierCurveRecords = (
    kaplanMeierPatientsData: KaplanMeierPatientData[]
): KaplanMeierCurveRecord[] => {
    kaplanMeierPatientsData = kaplanMeierPatientsData.filter(
        (kmPatientData) =>
            kmPatientData.start_date !== null &&
            kmPatientData.event_date !== null
    )
    const sortedEventTimesMap = getSortedEventTimesMap(kaplanMeierPatientsData)
    const records: KaplanMeierCurveRecord[] = []
    records.push({ time: 0, probability: 1 })
    let numberOfPatientsAtRisk = kaplanMeierPatientsData.length

    for (const [time, eventsAtTime] of sortedEventTimesMap.entries()) {
        numberOfPatientsAtRisk -= eventsAtTime
        const probability =
            numberOfPatientsAtRisk / kaplanMeierPatientsData.length

        records.push({ time, probability })
    }

    return records
}
