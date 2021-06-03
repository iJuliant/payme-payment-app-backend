const express = require('express')
const Route = express.Router()
const authRoute = require('../modules/auth/authRoutes')
const userRoute = require('../modules/users/userRoutes')

Route.use('/auth', authRoute)
Route.use('/user', userRoute)

module.exports = Route
