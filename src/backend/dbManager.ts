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

const db = new sqlite3.Database('db.sqlite')

const columnToSQL = (columnName: string, columnType: string) =>
    `${columnName} ${columnType}`

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
