import db from './dbManager'

const tableName = 'form_priusni'

export const insertFormPriusni = (
    data: Record<string, string | number | string[]>
) => {
    const keys = Object.keys(data)
    const values = Object.values(data)
    const placeholders = keys.map(() => '?').join(', ')
    const query = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`

    db.run(query, values, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

export const getAll = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM form_priusni', (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    })
}
