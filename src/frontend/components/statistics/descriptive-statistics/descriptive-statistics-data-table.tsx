import React from 'react'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { CountPercentage } from '../../../types/statistics.types'
import { useTranslation } from 'react-i18next'

interface Props {
    data: Record<string, CountPercentage> | undefined
    title: string
    emptyMessage?: string
}

const DescriptiveStatisticsDataTable: React.FC<Props> = ({
    data,
    title,
    emptyMessage = 'No data available',
}) => {
    const { t } = useTranslation()

    if (!data || Object.keys(data).length === 0) {
        return (
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                {emptyMessage}
            </Typography>
        )
    }

    const sortedEntries = Object.entries(data).sort(
        (a, b) => b[1].count - a[1].count
    )

    return (
        <>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 3, maxHeight: 400 }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Název</TableCell>
                            <TableCell align="right">Počet</TableCell>
                            <TableCell align="right">Procento</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedEntries.map(([name, stat]) => (
                            <TableRow key={name}>
                                <TableCell component="th" scope="row">
                                    {t(name)}
                                </TableCell>
                                <TableCell align="right">
                                    {stat.count}
                                </TableCell>
                                <TableCell align="right">
                                    {stat.percentage}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default DescriptiveStatisticsDataTable
