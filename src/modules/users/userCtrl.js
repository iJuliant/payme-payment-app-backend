const fs = require('fs')
const bcrypt = require('bcrypt')
// const helper = require('../../helpers/helper')
const path = require('path')
const wrapper = require('../../helpers/wrapper')
const userModel = require('./userModel')
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
      const { name, phone } = req.body
      const { id } = req.params
      const isExist = await userModel.getById(id)
      // const name = `${firstName} ${lastName}`
      // const preFixPhoneNumber = helper.numFormatter(phone)
      const setData = {
        user_name: name,
        user_email: isExist[0].user_email,
        user_image: req.file ? req.file.filename : '',
        user_phone: phone,
        user_updated_at: new Date(Date.now())
      }
      const result = await userModel.update(setData, id)

      const temp = path.join(__dirname, `../../uploads/${isExist[0].user_image}`)
      console.log(temp)
      const fileExist = fs.existsSync(temp)

      console.log(isExist[0].user_image)
      if (fileExist) {
        fs.unlink(`./src/uploads/${isExist[0].user_image}`, (err) => {
          !err ? console.log('File deleted') : console.log('Delete error')
        })
      } else {
        console.log('File not exist')
      }

      return wrapper.response(res, 200, 'Success update data', result)
    } catch (err) {
      const { id } = req.params
      console.log(id)
      console.log(err)
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
