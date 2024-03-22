import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import KaplanMeierFilter from './kaplan-meier-filter'
import KaplanMeierChart from './kapla-meier-chart'
import { KaplanMeierData } from '../types'
import { KaplanMeierType } from '../constants'

const KaplanMeier: React.FC = () => {
    const [kaplanMeierData, setKaplanMeierData] = useState<KaplanMeierData>({})
    const [selectedCurveType, setSelectedCurveType] =
        useState<KaplanMeierType | null>(null)

    return (
        <Grid container spacing={2} margin="0px">
            <Grid item xs={3}>
                <KaplanMeierFilter
                    selectedCurveType={selectedCurveType}
                    setSelectedCurveType={setSelectedCurveType}
                    setKaplanMeierData={setKaplanMeierData}
                />
            </Grid>
            <Grid item xs={9}>
                {selectedCurveType && (
                    <KaplanMeierChart
                        selectedCurveType={selectedCurveType}
                        kaplanMeierData={kaplanMeierData}
                    />
                )}
            </Grid>
        </Grid>
    )
}

export default KaplanMeier
