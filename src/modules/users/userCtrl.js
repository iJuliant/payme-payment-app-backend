const helper = require('../../helpers/helper')
const wrapper = require('../../helpers/wrapper')
const userModel = require('./userModel')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(+process.env.salt)

module.exports = {

  getUserById: async (req, res) => {
    try {
      const { id } = req.params
      const isExist = await userModel.getById(id)
      delete isExist[0].user_password

      if (isExist.length > 0) {
        return wrapper.response(res, 200, 'Success get data by id', isExist)
      } else {
        return wrapper.response(res, 404, 'Id not found', null)
      }
    } catch (err) {
      return wrapper.response(res, 400, 'Bad request', err)
    }
  },

  updateProfile: async (req, res) => {
    try {
      const { firstName, lastName, email, phoneNumber } = req.body
      const name = `${firstName} ${lastName}`
      const preFixPhoneNumber = helper.numFormatter(phoneNumber)
      const id = req.decodeToken.user_id
      const setData = {
        user_name: name,
        user_email: email,
        user_phone: preFixPhoneNumber,
        user_updated_at: new Date(Date.now())
      }
      const result = await userModel.update(setData, id)
      return wrapper.response(res, 200, 'Success update data', result)
    } catch (err) {
      return wrapper.response(res, 400, 'Bad request', err)
    }
  },

  updatePin: async (req, res) => {
    try {
      const { pin } = req.body
      const id = req.decodeToken.user_id
      const hashPin = bcrypt.hashSync(pin, salt)
      const setData = {
        user_pin: hashPin,
        user_updated_at: new Date(Date.now())
      }
      const result = await userModel.update(setData, id)

      return wrapper.response(res, 200, 'Pin created', result)
    } catch (err) {
      return wrapper.response(res, 400, 'Bad request', err)
    }
  }

}
