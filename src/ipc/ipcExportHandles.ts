import { dialog, ipcMain } from 'electron'
import { ipcExportChannels } from './ipcChannels'
import { Workbook } from 'exceljs'
import { PatientType } from '../frontend/types'
import { formTypeToBasicStringMap } from '../frontend/constants'

const exportPatients = async (patients: PatientType[], anonymized: boolean) => {
    const result = await dialog.showSaveDialog({
        title: 'Export Patients',
        defaultPath: 'patients.xlsx',
        filters: [{ name: 'Excel', extensions: ['xlsx'] }],
    })

    if (result.canceled) {
        return
    }

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
            const row = Object.values(patient)
            worksheet.addRow(row)
        })

        await workbook.xlsx.writeFile(
            `${result.filePath.replace('.xlsx', '')}_${formTypeToBasicStringMap[Number(formType)]}.xlsx`
        )
    }
}

ipcMain.handle(
    ipcExportChannels.export,
    async (event, patients: PatientType[]) => {
        await exportPatients(patients, false)
    }
)

ipcMain.handle(
    ipcExportChannels.exportAnonymized,
    async (event, patients: PatientType[]) => {
        await exportPatients(patients, true)
    }
)
