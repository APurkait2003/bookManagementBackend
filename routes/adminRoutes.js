const express = require('express')
const adminRouter = express.Router()

const adminController = require('../controllers/adminController')

adminRouter.post("/signup",adminController.adminSignup)
adminRouter.post("/signin",adminController.adminSignin)

module.exports = adminRouter
console.log("Admin router is working.")