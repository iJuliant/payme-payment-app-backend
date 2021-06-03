const jwt = require('jsonwebtoken')
const authModel = require('../modules/auth/authModel')
const wrapper = require('../helpers/wrapper')

module.exports = {

  authentication: (req, res, next) => {
    let token = req.headers.authorization

    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, 'SECRETX', (err, result) => {
        if (
          (err && err.name === 'jsonWebToken') ||
          (err && err.name === 'TokenExpiredError')
        ) {
          return wrapper.response(res, 403, err.message)
        } else {
          req.decodeToken = result
          next()
        }
      })
    } else {
      return wrapper.response(
        res,
        403,
        'You need to login first'
      )
    }
  },

  isVerified: (req, res, next) => {
    if (req.decodeToken.user_isVerified !== '0') {
      next()
    } else {
      return wrapper.response(
        res,
        401,
        'Please verify your email to continue'
      )
    }
  },

  isRegistered: async (req, res, next) => {
    const { email } = req.body
    const isExist = await authModel.getDataCondition({ user_email: email })

    if (isExist.length > 0) {
      return wrapper.response(res, 403, 'Email already registered')
    } else {
      next()
    }
  }

}
