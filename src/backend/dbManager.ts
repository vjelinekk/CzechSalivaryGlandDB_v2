import sqlite3 from 'sqlite3'
import {
    isInStudyColumns,
    parotidBenignColumns,
    passwordColumns,
    submandibularMalignantColumns,
    sublingualMalignantColumns,
    parotidMalignantColumns,
    studyColumns,
    submandibularBenignColumns,
    TableNames,
} from './constants'
import {
    IsInStudyColumns,
    ParotidBenignColumns,
    PasswordColumns,
    SubmandibularMalignantColumns,
    SublingualMalignantColumns,
    ParotidMalignantColumns,
    StudyColumns,
    SubmandibularBenignColumns,
} from './types'
import { columnToSQL } from './utils'
import path from 'path'
import { app } from 'electron'

const getDBPath = (filename: string): string => {
    let base = app.getAppPath()
    if (app.isPackaged) {
        base = base.replace(`${path.sep}app.asar`, '')
    }
    return path.resolve(base, `${filename}.sqlite`)
}

const db = new sqlite3.Database(getDBPath('db'))

const createTable = (
    tableName: TableNames,
    columns:
        | SubmandibularMalignantColumns
        | SublingualMalignantColumns
        | ParotidMalignantColumns
        | SubmandibularBenignColumns
        | ParotidBenignColumns
        | IsInStudyColumns
        | StudyColumns
        | PasswordColumns
) => {
    const columnDefinitions = Object.values(columns).map(
        ({ columnName, columnType }) => columnToSQL(columnName, columnType)
    )

    db.run(
        `CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefinitions.join(', ')})`
    )
}

export const createTables = () => {
    db.serialize(() => {
        createTable(
            TableNames.submandibularMalignant,
            submandibularMalignantColumns
        )
        createTable(TableNames.sublingualMalignant, sublingualMalignantColumns)
        createTable(TableNames.parotidMalignant, parotidMalignantColumns)
        createTable(TableNames.submandibularBenign, submandibularBenignColumns)
        createTable(TableNames.parotidBenign, parotidBenignColumns)
        createTable(TableNames.studies, studyColumns)
        createTable(TableNames.isInStudy, isInStudyColumns)
        createTable(TableNames.password, passwordColumns)
    })
}

createTables()

export default db
