const express = require('express')
const Route = express.Router()
const authRoute = require('../modules/auth/authRoutes')

Route.use('/auth', authRoute)

module.exports = Route
