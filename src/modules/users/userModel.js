const connection = require('../../config/mysql')

module.exports = {

  getById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE user_id = ?',
        id,
        (err, result) => {
          !err
            ? resolve(result)
            : reject(new Error(err))
        }
      )
    })
  },

  update: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE user SET ? WHERE user_id = ?',
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
