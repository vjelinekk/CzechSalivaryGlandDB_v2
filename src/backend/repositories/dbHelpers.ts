import db from '../dbManager'

export const runQuery = <T>(
    query: string,
    params: unknown[] = []
): Promise<T | undefined> => {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) reject(err)
            else resolve(row as T | undefined)
        })
    })
}

export const runQueryAll = <T>(
    query: string,
    params: unknown[] = []
): Promise<T[]> => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) reject(err)
            else resolve(rows as T[])
        })
    })
}

export const runInsert = (
    tableName: string,
    data: Record<string, unknown>
): Promise<number> => {
    return new Promise((resolve, reject) => {
        const columns = Object.keys(data).filter(
            (key) => data[key] !== undefined
        )
        const values = columns.map((key) => data[key])
        const placeholders = columns.map(() => '?').join(', ')

        const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`

        db.run(query, values, function (err) {
            if (err) reject(err)
            else resolve(this.lastID)
        })
    })
}

export const runUpdate = (
    tableName: string,
    id: number,
    data: Record<string, unknown>,
    idColumn = 'id'
): Promise<number> => {
    return new Promise((resolve, reject) => {
        const columns = Object.keys(data).filter(
            (key) => key !== idColumn && data[key] !== undefined
        )
        const values = columns.map((key) => data[key])
        const setClause = columns.map((col) => `${col} = ?`).join(', ')

        const query = `UPDATE ${tableName} SET ${setClause} WHERE ${idColumn} = ?`

        db.run(query, [...values, id], function (err) {
            if (err) reject(err)
            else resolve(this.changes)
        })
    })
}

export const runDelete = (
    tableName: string,
    id: number,
    idColumn = 'id'
): Promise<void> => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM ${tableName} WHERE ${idColumn} = ?`
        db.run(query, [id], (err) => {
            if (err) reject(err)
            else resolve()
        })
    })
}

export const runDeleteWhere = (
    tableName: string,
    conditions: { column: string; value: unknown }[]
): Promise<void> => {
    return new Promise((resolve, reject) => {
        const whereClause = conditions
            .map((c) => `${c.column} = ?`)
            .join(' AND ')
        const values = conditions.map((c) => c.value)
        const query = `DELETE FROM ${tableName} WHERE ${whereClause}`
        db.run(query, values, (err) => {
            if (err) reject(err)
            else resolve()
        })
    })
}
