import sqlite3 from 'sqlite3'
import {
    jeVeStudiiColumns,
    podcelistniColumns,
    podjazykoveColumns,
    priusniColumns,
    studieColumns,
    TableNames,
} from './constants'
import {
    JeVeStudiiColumns,
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
    if (app.isPackaged) {
        base = base.replace('/app.asar', '')
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
})

export default db
