require('dotenv').config()
const authModel = require('./authModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sendMail } = require('../../helpers/mailer')
const userModel = require('../users/userModel')
const wrapper = require('../../helpers/wrapper')
const salt = bcrypt.genSaltSync(+process.env.SALT)

module.exports = {

  register: async (req, res) => {
    try {
      const { name, email, password } = req.body
      const encrypted = bcrypt.hashSync(password, salt)

      const setData = {
        user_name: name,
        user_email: email,
        user_password: encrypted,
        user_phone: '+62',
        user_is_verified: '0',
        user_otp: '0'
      }

      const result = await authModel.register(setData)
      delete result.user_password
      console.log(result)

      sendMail(email, result.id, 'verify')
      return wrapper.response(res, 200, 'Registration success', result)
    } catch (err) {
      console.log(err)
      return wrapper.response(res, 400, 'Bad request', err)
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const isExist = await authModel.getDataCondition({ user_email: email })

      if (isExist.length > 0) {
        const isMatch = bcrypt.compareSync(password, isExist[0].user_password)

        if (isMatch) {
          const payLoad = isExist[0]
          delete payLoad.user_password
          const token = jwt.sign({ ...payLoad }, 'SECRETX', { expiresIn: '24h' })
          const result = { ...payLoad, token }

          return wrapper.response(res, 200, 'Login succeed', result)
        } else {
          return wrapper.response(res, 401, 'Password mismatch')
        }
      } else {
        return wrapper.response(res, 404, 'Email not registered')
      }
    } catch (err) {
      return wrapper.response(res, '400', 'Bad request', err)
    }
  },

  changePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body
      const temp = await userModel.getById(req.decodeToken.user_id)

      const isMatch = bcrypt.compareSync(oldPassword, temp[0].user_password)
      if (isMatch) {
        const id = req.decodeToken.user_id
        const encrypted = bcrypt.hashSync(newPassword, salt)
        const setData = {
          user_password: encrypted,
          user_updated_at: new Date(Date.now())
        }

        const result = await userModel.update(setData, id)
        return wrapper.response(res, 200, 'Password successfully changed', result)
      } else {
        return wrapper.response(res, 401, 'Old password mismatch')
      }
    } catch (err) {
      console.log(req.decodeToken)
      console.log(err)
      return wrapper.response(res, 400, 'Bad request', err)
    }
  },

  verify: async (req, res) => {
    try {
      const { id } = req.params
      const isExist = await userModel.getById(id)

      if (isExist.length > 0) {
        const setData = {
          user_is_verified: 1,
          user_updated_at: new Date(Date.now())
        }
        const result = await userModel.update(setData, id)
        return wrapper.response(res, 200, 'Verification succeeded', result)
      } else {
        console.log(id)
      }
    } catch (err) {
      console.log(err)
      return wrapper.response(res, 400, 'Bad request', err)
    }
  },

  reqOtp: async (req, res) => {
    try {
      const { email } = req.body
      const isExist = await authModel.getDataCondition({ user_email: email })

      if (isExist.length > 0) {
        const id = isExist[0].user_id
        const token = Math.floor(1000 + Math.random() * 9000)
        const setData = {
          user_otp: token,
          user_updated_at: new Date(Date.now())
        }
        const result = await userModel.update(setData, id)

        sendMail(email, id, 'request otp', token)
        return wrapper.response(res, 200, 'Otp has been sent', result)
      } else {
        return wrapper.response(res, 404, 'Email not registered')
      }
    } catch (err) {
      console.log(err)
      return wrapper.response(res, 400, 'Bad request', err)
    }
  },

  forgetPass: async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body
      const isExist = await authModel.getDataCondition({ user_email: email })

      if (isExist.length > 0) {
        const id = isExist[0].user_id
        const now = new Date(Date.now())
        const timeSpan = Math.floor((now - isExist[0].user_updated_at) / 60000)
        console.log(timeSpan)

        if (timeSpan <= 5 && +otp === isExist[0].user_otp) {
          const password = bcrypt.hashSync(newPassword, salt)
          const setData = {
            user_password: password,
            user_updated_at: new Date(Date.now())
          }
          const result = await userModel.update(setData, id)
          return wrapper.response(res, 200, 'Password has been changed', result)
        } else {
          return wrapper.response(res, 401, 'Otp mismatch or has been expired')
        }
      } else {
        return wrapper.response(res, 404, 'Email not registered')
      }
    } catch (err) {
      return wrapper.response(res, 400, 'Bad request', err)
    }
  }

}
