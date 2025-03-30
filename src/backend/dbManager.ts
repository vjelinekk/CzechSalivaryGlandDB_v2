import sqlite3 from 'sqlite3'
import {
    jeVeStudiiColumns,
    paroditBenignColumns,
    passwordColumns,
    podcelistniColumns,
    podjazykoveColumns,
    priusniColumns,
    studieColumns,
    submandibularBenignColumns,
    TableNames,
} from './constants'
import {
    JeVeStudiiColumns,
    ParotidBenignColumns,
    PasswordColumns,
    PodcelistniColumns,
    PodjazykoveColumns,
    PriusniColumns,
    StudieColumns,
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
        | PodcelistniColumns
        | PodjazykoveColumns
        | PriusniColumns
        | SubmandibularBenignColumns
        | ParotidBenignColumns
        | JeVeStudiiColumns
        | StudieColumns
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
        createTable(TableNames.podcelistni, podcelistniColumns)
        createTable(TableNames.podjazykove, podjazykoveColumns)
        createTable(TableNames.priusni, priusniColumns)
        createTable(TableNames.submandibularBenign, submandibularBenignColumns)
        createTable(TableNames.parotidBenign, paroditBenignColumns)
        createTable(TableNames.studie, studieColumns)
        createTable(TableNames.jeVeStudii, jeVeStudiiColumns)
        createTable(TableNames.password, passwordColumns)
    })
}

createTables()

export default db
