const express = require('express')
const userRoutes = express.Router()


const {register} = require('../Controllers/userControllers')
const {loginUser} = require('../Controllers/userControllers')


userRoutes.post('/signup',register)
userRoutes.post('/login',loginUser)


module.exports = userRoutes