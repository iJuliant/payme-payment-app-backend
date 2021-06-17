const connection = require('../../config/mysql')

module.exports = {
  getBalance: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT balance FROM balance WHERE user_id = ?',
        id,
        (error, result) => {
          !error
            ? resolve(result)
            : reject(new Error(error))
        }
      )
    })
  },

  create: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO balance SET ?',
        [data],
        (err, result) => {
          if (!err) {
            const newResult = {
              id: result.insertId,
              ...data
            }
            resolve(newResult)
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  },

  update: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE balance SET ? WHERE user_id = ?',
        [data, id],
        (err) => {
          !err
            ? resolve({ id, ...data })
            : reject(new Error(err))
        }
      )
    })
  }
}
