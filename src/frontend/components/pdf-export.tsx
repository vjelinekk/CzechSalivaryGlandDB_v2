import React from 'react'
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
import { sub } from 'date-fns';

interface PDFfileProps {
    plannedDaysRows: any;
    startDate: string;
    endDate: string;
}

Font.register({
    family: 'Arial',
    src: '/fonts/Arial.ttf',
    fontWeight: 'normal'
})
Font.register({
    family: 'Arial',
    src: '/fonts/ArialBD.ttf',
    fontWeight: 'bold'
})

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

const PDFfile: React.FC<PDFfileProps> = ({ plannedDaysRows, startDate, endDate }) => {
    const { t } = useTranslation()

    return (
    <Document>
        <Page size="A4" style={styles.body}>
            <Text style={styles.header}>{t(appTranslationKeys.plannedChecks)}</Text>
            <Text style={styles.subheader}>
                {startDate} - {endDate}
            </Text>

            {plannedDaysRows.map((row: any[], rowIndex: number) =>
                row.map((day, dayIndex) => (
                    <View style={styles.section} key={`day-${rowIndex}-${dayIndex}`}>
                        <Text style={styles.heading}>
                            {new Date(day.date).toLocaleDateString('cs-CZ')}
                        </Text>
                        {day.patients.length === 0 ? (
                            <Text style={styles.text}>{t(appTranslationKeys.noPlannedChecks)}</Text>
                        ) : (
                            day.patients.map((p: any) => (
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
