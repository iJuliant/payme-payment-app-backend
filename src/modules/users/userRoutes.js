const express = require('express')
const Route = express.Router()
const { authentication } = require('../../middlewares/auth')
const { getUserById, updateProfile, updatePin } = require('./userCtrl')

Route.get(
  '/:id',
  authentication,
  getUserById
)

Route.patch(
  '/update-profile',
  authentication,
  updateProfile
)

Route.patch(
  '/update-pin',
  authentication,
  updatePin
)

module.exports = Route
