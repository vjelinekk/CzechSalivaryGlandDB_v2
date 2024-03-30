import sqlite3 from 'sqlite3'
import {
    jeVeStudiiColumns,
    passwordColumns,
    podcelistniColumns,
    podjazykoveColumns,
    priusniColumns,
    studieColumns,
    TableNames,
} from './constants'
import {
    JeVeStudiiColumns,
    PasswordColumns,
    PodcelistniColumns,
    PodjazykoveColumns,
    PriusniColumns,
    StudieColumns,
} from './types'
import { columnToSQL } from './utils'
import path from 'path'
import { app } from 'electron'

const getDBPath = (filename: string): string => {
    let base = app.getAppPath()
    console.log(base)
    if (app.isPackaged) {
        base = base.replace(`${path.sep}app.asar`, '')
        console.log(base)
    }
    return path.resolve(base, `${filename}.sqlite`)
}

console.log(getDBPath('db'))
const db = new sqlite3.Database(getDBPath('db'))

const createTable = (
    tableName: TableNames,
    columns:
        | PodcelistniColumns
        | PodjazykoveColumns
        | PriusniColumns
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

db.serialize(() => {
    createTable(TableNames.podcelistni, podcelistniColumns)
    createTable(TableNames.podjazykove, podjazykoveColumns)
    createTable(TableNames.priusni, priusniColumns)
    createTable(TableNames.studie, studieColumns)
    createTable(TableNames.jeVeStudii, jeVeStudiiColumns)
    createTable(TableNames.password, passwordColumns)
})

export default db
