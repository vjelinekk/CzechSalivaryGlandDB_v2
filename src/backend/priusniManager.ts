import db from './dbManager'

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
