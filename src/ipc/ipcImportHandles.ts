import { dialog, ipcMain } from 'electron'
import { ipcImportChannels } from './ipcChannels'
import { Workbook } from 'exceljs'
import { PatientType } from '../frontend/types'
import { FormType } from '../frontend/constants'
import { savePatient } from '../backend/patientsManager'

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

    const worksheet = workbook.getWorksheet(1) // Assuming data is in the first worksheet

    const data: PatientType[] = []

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
        data.push(patient)
    })

    data.forEach((patient) => {
        const dataJSON = JSON.parse(JSON.stringify(patient))
        savePatient(dataJSON)
    })
})
