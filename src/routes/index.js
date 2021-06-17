const express = require('express')
const Route = express.Router()
const authRoute = require('../modules/auth/authRoutes')
const userRoute = require('../modules/users/userRoutes')
const transactionRoute = require('../modules/transaction/transactionRoutes')

Route.use('/auth', authRoute)
Route.use('/user', userRoute)
Route.use('/transaction', transactionRoute)

module.exports = Route
