import { dialog, ipcMain } from 'electron'
import { ipcImportChannels } from './ipcChannels'
import { Workbook } from 'exceljs'
import { PatientType } from '../frontend/types'
import { FormType } from '../frontend/constants'
import { savePatient } from '../backend/repositories/patientRepository'
import { transformLegacyPatient } from '../backend/services/ImportTransformService'

type PatientValue = string | number | FormType

ipcMain.handle(ipcImportChannels.import, async () => {
    const result = await dialog.showOpenDialog({
        title: 'Import Patients',
        properties: ['openFile'],
        filters: [{ name: 'Excel', extensions: ['xlsx'] }],
    })

    if (result.canceled) {
        return
    }

    const filePath = result.filePaths[0]

    const workbook = new Workbook()
    await workbook.xlsx.readFile(filePath)

    const worksheet = workbook.getWorksheet(1)

    const data: PatientType[] = []
    const headerRow = worksheet.getRow(1)
    const headerValues = headerRow.values as (string | null)[]
    const isLegacyFormat = !headerValues.includes('id_edition')

    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        if (rowNumber === 1) {
            return
        }

        const patient: PatientType = {}

        row.eachCell((cell, columnIndex) => {
            const label = worksheet.getRow(1).getCell(columnIndex)
                .value as string
            if (label === 'id' || cell.value === null) {
                return
            }
            patient[label] = cell.value as PatientValue
        })

        if (isLegacyFormat) {
            transformLegacyPatient(patient)
        }

        data.push(patient)
    })

    for (const patient of data) {
        console.log(patient);
        await savePatient(patient)
    }
})
