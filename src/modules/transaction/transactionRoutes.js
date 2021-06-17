const express = require('express')
const route = express.Router()
const controller = require('./transactionCtrl')
const authMiddleware = require('../../middlewares/auth')

// route.get('/',
//   authMiddleware.authentication,
//   controller.getTransactionHistory
// )

route.get(
  '/',
  controller.hello
)

route.get(
  '/balance/:id',
  authMiddleware.authentication,
  controller.getBalance
)

route.patch(
  '/top-up/:id',
  authMiddleware.authentication,
  controller.topUp
)

module.exports = route
