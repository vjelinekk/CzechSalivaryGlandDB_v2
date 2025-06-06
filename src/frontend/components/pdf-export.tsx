import React, { useEffect } from 'react'
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from '@react-pdf/renderer'
import { useTranslation } from 'react-i18next'
import { appTranslationKeys } from '../translations'
import { PlannedDay } from '../types'

interface PDFfileProps {
    plannedDaysRows: PlannedDay[][]
    startDate: string
    endDate: string
}

const styles = StyleSheet.create({
    body: {
        margin: 10,
        marginTop: 15,
        fontFamily: 'Arial',
    },

    header: {
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    subheader: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    section: {
        margin: 5,
        marginLeft: 25,
        padding: 10,
        fontSize: 12,
    },
    text: {
        marginLeft: 10,
    },
    heading: {
        fontSize: 14,
        marginBottom: 5,
        fontWeight: 'bold',
    },
})

const PDFfile: React.FC<PDFfileProps> = ({
    plannedDaysRows,
    startDate,
    endDate,
}) => {
    useEffect(() => {
        const registerFonts = async () => {
            try {
                Font.register({
                    family: 'Arial',
                    src: await window.fs.getPublicProductionReadyPath(
                        '/fonts/Arial.ttf'
                    ),
                    fontWeight: 'normal',
                })
                Font.register({
                    family: 'Arial',
                    src: await window.fs.getPublicProductionReadyPath(
                        '/fonts/ArialBD.ttf'
                    ),
                    fontWeight: 'bold',
                })
            } catch (error) {
                console.error('Error registering fonts:', error)
            }
        }

        registerFonts()
    }, [])

    const { t } = useTranslation()

    return (
        <Document>
            <Page size="A4" style={styles.body}>
                <Text style={styles.header}>
                    {t(appTranslationKeys.plannedChecks)}
                </Text>
                <Text style={styles.subheader}>
                    {startDate} - {endDate}
                </Text>

                {plannedDaysRows.map((row, rowIndex: number) =>
                    row.map((day, dayIndex) => (
                        <View
                            style={styles.section}
                            key={`day-${rowIndex}-${dayIndex}`}
                        >
                            <Text style={styles.heading}>
                                {new Date(day.date).toLocaleDateString('cs-CZ')}
                            </Text>
                            {day.patients.length === 0 ? (
                                <Text style={styles.text}>
                                    {t(appTranslationKeys.noPlannedChecks)}
                                </Text>
                            ) : (
                                day.patients.map((p) => (
                                    <Text key={p.id} style={styles.text}>
                                        {p.jmeno} {p.prijmeni}
                                    </Text>
                                ))
                            )}
                        </View>
                    ))
                )}
            </Page>
        </Document>
    )
}

export default PDFfile
