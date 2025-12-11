const express = require('express')
const userRoutes = express.Router()

const userController = require('../controllers/userController')

userRoutes.post("/signup",userController.signup)

userRoutes.get("/all",userController.allUser)

userRoutes.delete("/delete/:uid",userController.deleteUserById)

userRoutes.post("/login",userController.login)

userRoutes.put("/update", userController.updateUser)

module.exports = userRoutes
console.log("user router is working")