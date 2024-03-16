import { RunResult } from 'sqlite3'
import { TableNames } from './constants'
import db from './dbManager'
import { RowRecordType } from './types'

export const insertRow = (
    tableName: TableNames,
    data: RowRecordType
): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        const keys = Object.keys(data)
        const values = Object.values(data)
        const placeholders = keys.map(() => '?').join(', ')
        const query = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`

        db.run(query, values, function (err) {
            if (err) {
                reject(err)
            } else {
                const id = (this as RunResult).lastID
                resolve(id)
            }
        })
    })
}

export const getRow = (
    tableName: TableNames,
    id: number
): Promise<RowRecordType> => {
    const query = `SELECT * FROM ${tableName} WHERE id = ?`
    return new Promise((resolve, reject) => {
        db.get(query, [id], (err, row) => {
            if (err) {
                reject(err)
            }
            resolve(row as RowRecordType)
        })
    })
}

export const getAllRows = (tableName: TableNames): Promise<RowRecordType[]> => {
    const query = `SELECT * FROM ${tableName}`
    return new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows as RowRecordType[])
        })
    })
}

export const getRowsBy = (
    tableName: TableNames,
    columns: string[],
    values: string[] | number[]
): Promise<RowRecordType[]> => {
    if (columns.length !== values.length) {
        throw new Error('Columns and values must have the same length')
    }
    if (columns.length === 0 || values.length === 0) {
        throw new Error('Columns and values must not be empty')
    }
    let whereStatement: string
    if (columns.length === 1) {
        whereStatement = `${columns[0]} = ?`
    } else {
        whereStatement = columns.map((column) => `${column} = ?`).join(' AND ')
    }

    const query = `SELECT * FROM ${tableName} WHERE ${whereStatement}`
    return new Promise((resolve, reject) => {
        db.all(query, values, (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows as RowRecordType[])
        })
    })
}

export const updateRow = (
    tableName: TableNames,
    id: number,
    data: Record<string, string | number | string[]>
): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        const keys = Object.keys(data)
        const values = Object.values(data)
        const placeholders = keys.map((key) => `${key} = ?`).join(', ')
        const query = `UPDATE ${tableName} SET ${placeholders} WHERE id = ?`
        db.run(query, [...values, id], function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(id)
            }
        })
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const saveRow = async (
    tableName: TableNames,
    data: RowRecordType
): Promise<void> => {
    const row = await getRow(tableName, data.id as number)
    if (row) {
        await updateRow(tableName, data.id as number, data)
    } else {
        await insertRow(tableName, data)
    }
}

export const deleteRow = (tableName: TableNames, id: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        const query = `DELETE FROM ${tableName} WHERE id = ?`
        db.run(query, [id], (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

export const deleteRowsBy = (
    tableName: TableNames,
    columns: string[],
    values: string[] | number[]
): Promise<void> => {
    if (columns.length !== values.length) {
        throw new Error('Columns and values must have the same length')
    }
    if (columns.length === 0 || values.length === 0) {
        throw new Error('Columns and values must not be empty')
    }
    let whereStatement: string
    if (columns.length === 1) {
        whereStatement = `${columns[0]} = ?`
    } else {
        whereStatement = columns.map((column) => `${column} = ?`).join(' AND ')
    }

    return new Promise<void>((resolve, reject) => {
        const query = `DELETE FROM ${tableName} WHERE ${whereStatement}`
        db.run(query, values, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}
