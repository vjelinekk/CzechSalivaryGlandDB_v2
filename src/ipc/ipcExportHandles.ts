import { dialog, ipcMain } from 'electron'
import { ipcExportChannels } from './ipcChannels'
import { Workbook } from 'exceljs'
import { PatientType } from '../frontend/types'
import { formTypeToBasicStringMap } from '../frontend/constants'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const translations: Record<string, Record<string, string>> = {
    cs: {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        ...require('../../public/locales/translation-cs.json'),
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        ...require('../../public/locales/form-translation-cs.json'),
    },
    en: {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        ...require('../../public/locales/translation-en.json'),
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        ...require('../../public/locales/form-translation-en.json'),
    },
    sk: {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        ...require('../../public/locales/translation-sk.json'),
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        ...require('../../public/locales/form-translation-sk.json'),
    },
}

function translateValueForExport(
    value: string,
    translationMap: Record<string, string>
): string {
    if (!value) return value
    if (value.includes(',')) {
        return value
            .split(',')
            .map((v) => translationMap[v.trim()] ?? v.trim())
            .join(', ')
    }
    return translationMap[value] ?? value
}

const exportPatients = async (
    patients: PatientType[],
    anonymized: boolean,
    language: string
) => {
    const result = await dialog.showSaveDialog({
        title: 'Export Patients',
        defaultPath: 'patients.xlsx',
        filters: [{ name: 'Excel', extensions: ['xlsx'] }],
    })

    if (result.canceled) {
        return
    }

    const translationMap = translations[language] ?? translations['cs']

    const groupedPatients: { [key: number]: PatientType[] } = patients.reduce(
        (group, patient) => {
            const key = patient.form_type
            if (!group[key]) {
                group[key] = []
            }
            group[key].push(patient)
            return group
        },
        {} as { [key: number]: PatientType[] }
    )

    for (const [formType, patients] of Object.entries(groupedPatients)) {
        const workbook = new Workbook()
        const worksheet = workbook.addWorksheet('Pacienti')

        const headers = Object.keys(patients[0])
        worksheet.addRow(headers)

        patients.forEach((patient) => {
            patient.jmeno = anonymized ? 'anonymizováno' : patient.jmeno
            patient.prijmeni = anonymized ? 'anonymizováno' : patient.prijmeni
            patient.rodne_cislo = anonymized
                ? 'anonymizováno'
                : patient.rodne_cislo
            const row = Object.values(patient).map((value) => {
                if (typeof value === 'string') {
                    return translateValueForExport(value, translationMap)
                }
                return value
            })
            worksheet.addRow(row)
        })

        await workbook.xlsx.writeFile(
            `${result.filePath.replace('.xlsx', '')}_${formTypeToBasicStringMap[Number(formType)]}.xlsx`
        )
    }
}

ipcMain.handle(
    ipcExportChannels.export,
    async (event, patients: PatientType[], language: string) => {
        await exportPatients(patients, false, language)
    }
)

ipcMain.handle(
    ipcExportChannels.exportAnonymized,
    async (event, patients: PatientType[], language: string) => {
        await exportPatients(patients, true, language)
    }
)
