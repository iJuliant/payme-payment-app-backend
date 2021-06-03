const express = require('express')
const Route = express.Router()
const { authentication, isRegistered } = require('../../middlewares/auth')

const { register, login, verify, changePassword, reqOtp, forgetPass } = require('./authCtr')

Route.post(
  '/register',
  isRegistered,
  register
)

Route.post('/verify/:id', verify)

Route.post('/login', login)

Route.patch(
  '/change-pass',
  authentication,
  changePassword
)

Route.patch('/req-otp', reqOtp)

Route.patch('/forget-pass', forgetPass)

module.exports = Route
