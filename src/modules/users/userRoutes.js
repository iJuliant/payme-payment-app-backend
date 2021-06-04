const express = require('express')
const Route = express.Router()
const { authentication } = require('../../middlewares/auth')
const { getUserById, updateProfile, updatePin } = require('./userCtrl')
const uploadFile = require('../../middlewares/uploads')

Route.get(
  '/:id',
  authentication,
  getUserById
)

Route.patch(
  '/update-profile',
  authentication,
  uploadFile,
  updateProfile
)

Route.patch(
  '/update-pin',
  authentication,
  updatePin
)

module.exports = Route
