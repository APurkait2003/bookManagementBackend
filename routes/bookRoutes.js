const express = require('express')
const bookRoutes = express.Router()

//const dbConnect = require('../dataBase/db.config')

const bookController = require('../controllers/bookController')

const checkLogin = require('../middleware/auth')

bookRoutes.post("/add",bookController.addBooks/*,checkLogin*/)

bookRoutes.get("/all",bookController.allBooks/*,checkLogin*/)

bookRoutes.get("/:id",bookController.getBookId/*,checkLogin*/)

bookRoutes.put("/update/:id",bookController.updateById/*,checkLogin*/)

bookRoutes.patch("/patch/:id",bookController.updateSomeById/*,checkLogin*/)

bookRoutes.delete("/delete/:id",bookController.deleteById/*,checkLogin*/)

module.exports = bookRoutes
console.log("Book router is working.")