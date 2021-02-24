//file where routes for login and logout will be made
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const userController = require('../controllers/UserController')
router.get('/login', userController.show)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

module.exports = router
