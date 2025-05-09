import { Box, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from 'recharts'
import { StatisticsData } from '../../../../frontend/types/statistics.types'
import { COLORS } from '../../../../frontend/constants/statistics.constants'
import { createDataTable } from '../../../../frontend/utils/statistics/createDataTable'

interface TnmStatisticsProps {
    statistics: StatisticsData
}

const TnmStatistics: React.FC<TnmStatisticsProps> = ({ statistics }) => {
    return (
        <>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    TNM Klasifikace Klinická
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        {createDataTable(
                            statistics?.tnmClassificationClinical.t,
                            'T Klasifikace'
                        )}
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        {createDataTable(
                            statistics?.tnmClassificationClinical.n,
                            'N Klasifikace'
                        )}
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        {createDataTable(
                            statistics?.tnmClassificationClinical.m,
                            'M Klasifikace'
                        )}
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        {createDataTable(
                            statistics?.tnmClassificationClinical.stage,
                            'Stadium'
                        )}
                    </Grid>
                </Grid>

                {/* Stage Distribution Visualization */}
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Distribuce stadií
                    </Typography>
                    <Box sx={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={Object.entries(
                                        statistics?.tnmClassificationClinical
                                            .stage || {}
                                    ).map(([name, data]) => ({
                                        name: `Stadium ${name}`,
                                        value: data.count,
                                    }))}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    label={({ name, percent }) =>
                                        `${name}: ${(percent * 100).toFixed(0)}%`
                                    }
                                >
                                    {Object.entries(
                                        statistics?.tnmClassificationClinical
                                            .stage || {}
                                    ).map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => [
                                        `${value} pacientů`,
                                        'Počet',
                                    ]}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* TNM Classification Pathological */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    TNM Klasifikace Patologická
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        {createDataTable(
                            statistics?.tnmClassificationPathological.t,
                            'T Klasifikace'
                        )}
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        {createDataTable(
                            statistics?.tnmClassificationPathological.n,
                            'N Klasifikace'
                        )}
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        {createDataTable(
                            statistics?.tnmClassificationPathological.m,
                            'M Klasifikace'
                        )}
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        {createDataTable(
                            statistics?.tnmClassificationPathological.stage,
                            'Stadium'
                        )}
                    </Grid>
                </Grid>

                {/* Stage Distribution Visualization */}
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Distribuce stadií
                    </Typography>
                    <Box sx={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={Object.entries(
                                        statistics
                                            ?.tnmClassificationPathological
                                            .stage || {}
                                    ).map(([name, data]) => ({
                                        name: `Stadium ${name}`,
                                        value: data.count,
                                    }))}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    label={({ name, percent }) =>
                                        `${name}: ${(percent * 100).toFixed(0)}%`
                                    }
                                >
                                    {Object.entries(
                                        statistics
                                            ?.tnmClassificationPathological
                                            .stage || {}
                                    ).map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => [
                                        `${value} pacientů`,
                                        'Počet',
                                    ]}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                </Box>
            </Box>

            <Divider sx={{ my: 4 }} />
        </>
    )
}

export default TnmStatistics
