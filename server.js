const express = require('express')
const app = express()

const bookRouter = require('./routes/bookRoutes')
const userRoutes = require("./routes/userRoutes")
const adminRouter = require("./routes/adminRoutes")

const env = require('dotenv').config()
const host = process.env.HOST
const port = process.env.PORT

const cors = require('cors')
const dbConnect = require('./dataBase/db.config')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use("/api/books",bookRouter)
app.use("/api/user",userRoutes)
app.use("/api/admin",adminRouter)

app.get("/",(req,res)=>{
    res.send("<h1>Welcome to THE BOOKSTORE</h1>")
})
app.listen(port, "0.0.0.0", () => {
    console.log(`Server started at http://0.0.0.0:${port}`);
});