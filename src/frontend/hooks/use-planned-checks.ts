import { useEffect, useState } from 'react'
import { PlannedDay, PlannedPatientsMap } from '../types'

export const usePlanedChecks = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())
    const [endDate, setEndDate] = useState<Date | null>(
        new Date(new Date().setMonth(new Date().getMonth() + 1))
    )
    // TODO: Decide if we will need this state or if we will delete it
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [plannedDays, setPlannedDays] = useState<PlannedPatientsMap>({})
    const [plannedDaysRows, setPlannedDaysRows] = useState<PlannedDay[][]>([])

    // Load planned checks data
    useEffect(() => {
        const fetchPlannedChecks = async () => {
            try {
                const data = await window.api.getPlannedPatientsBetweenDates(
                    startDate,
                    endDate
                )
                console.log(data)
                setPlannedDays(data)

                // Transform data into rows where each row contains at max 5 patients
                const rows: PlannedDay[][] = []

                // Step 1: Convert object entries to array of PlannedDay
                const plannedDaysArray = Object.entries(data)
                    .map(([date, patients]) => ({
                        date: new Date(date),
                        patients,
                    }))
                    // Step 2: Sort the array by date (ascending order)
                    .sort((a, b) => a.date.getTime() - b.date.getTime())

                // Step 3: Group into rows of 5
                for (let i = 0; i < plannedDaysArray.length; i++) {
                    const plannedDay = plannedDaysArray[i]
                    const lastRow = rows[rows.length - 1]
                    if (lastRow && lastRow.length < 5) {
                        lastRow.push(plannedDay)
                    } else {
                        rows.push([plannedDay])
                    }
                }

                setPlannedDaysRows(rows)
            } catch (error) {
                console.error('Error fetching planned checks:', error)
            }
        }

        fetchPlannedChecks()
    }, [startDate, endDate])

    return {
        plannedDaysRows,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
    }
}
