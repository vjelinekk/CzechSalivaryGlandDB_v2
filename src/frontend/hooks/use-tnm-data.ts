import { useEffect, useState, useCallback } from 'react'
import { TnmEdition, TnmValueDefinition } from '../types'

interface UseTnmDataResult {
    edition: TnmEdition | null
    tOptions: TnmValueDefinition[]
    nOptions: TnmValueDefinition[]
    mOptions: TnmValueDefinition[]
    gOptions: TnmValueDefinition[]
    isLoading: boolean
    error: string | null
    calculateStage: (
        tValueId: number | null,
        nValueId: number | null,
        mValueId: number | null
    ) => Promise<TnmValueDefinition | null>
}

const useTnmData = (initialEditionId?: number): UseTnmDataResult => {
    const [edition, setEdition] = useState<TnmEdition | null>(null)
    const [tOptions, setTOptions] = useState<TnmValueDefinition[]>([])
    const [nOptions, setNOptions] = useState<TnmValueDefinition[]>([])
    const [mOptions, setMOptions] = useState<TnmValueDefinition[]>([])
    const [gOptions, setGOptions] = useState<TnmValueDefinition[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadTnmData = async () => {
            try {
                setIsLoading(true)
                setError(null)

                let selectedEdition: TnmEdition | null = null

                if (initialEditionId) {
                    // Fetch specific edition if ID is provided
                    selectedEdition =
                        await window.api.getTnmEditionById(initialEditionId)
                } else {
                    // Otherwise fetch default active edition
                    selectedEdition = await window.api.getActiveTnmEdition()
                }

                if (!selectedEdition) {
                    setError('No TNM edition found')
                    setIsLoading(false)
                    return
                }

                setEdition(selectedEdition)

                const [tValues, nValues, mValues, gValues] = await Promise.all([
                    window.api.getTnmValues(selectedEdition.id, 'T'),
                    window.api.getTnmValues(selectedEdition.id, 'N'),
                    window.api.getTnmValues(selectedEdition.id, 'M'),
                    window.api.getTnmValues(selectedEdition.id, 'G'),
                ])

                setTOptions(tValues)
                setNOptions(nValues)
                setMOptions(mValues)
                setGOptions(gValues)
            } catch (err) {
                console.error('Error loading TNM data:', err)
                setError('Failed to load TNM data')
            } finally {
                setIsLoading(false)
            }
        }

        loadTnmData()
    }, [initialEditionId])

    const calculateStage = useCallback(
        async (
            tValueId: number | null,
            nValueId: number | null,
            mValueId: number | null
        ): Promise<TnmValueDefinition | null> => {
            if (!edition) {
                return null
            }

            try {
                return await window.api.calculateTnmStage(
                    edition.id,
                    tValueId,
                    nValueId,
                    mValueId
                )
            } catch (err) {
                console.error('Error calculating TNM stage:', err)
                return null
            }
        },
        [edition]
    )

    return {
        edition,
        tOptions,
        nOptions,
        mOptions,
        gOptions,
        isLoading,
        error,
        calculateStage,
    }
}

export default useTnmData
