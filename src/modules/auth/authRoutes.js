const express = require('express')
const Route = express.Router()

const { register, login, verify, reqOtp, forgetPass } = require('./authCtr')

Route.post('/login', login)
Route.post('/register', register)
Route.post('/verify/:id', verify)
Route.patch('/req-otp', reqOtp)
Route.patch('/forget-pass', forgetPass)

module.exports = Route
