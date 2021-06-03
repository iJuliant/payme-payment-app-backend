const connection = require('../../config/mysql')

module.exports = {

  register: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO user SET ?',
        data,
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

  getDataCondition: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE ?',
        data,
        (err, result) => {
          !err
            ? resolve(result)
            : reject(new Error(err))
        }
      )
    })
  }

}
