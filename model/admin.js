const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    "mail" : {
        type : String,
        required : true,
        validate : {
            validator : (mailValue)=>{
                let mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if(mailRegex.test(mailValue)) return true ; return false
            },
            message : (props)=>{
                return `${props.value} Enter valid mail.`
            }
        }
    },
    "password" : {
        type : String,
        required : true,
        validate : {
            validator : (passValue)=>{
                let passwordRegex = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?!.*\s).*$/
                if(passwordRegex.test(passValue)) return true ; return false
            },
            message : (props)=>{
                return `${props.value} Enter valid password.`
            }
        }
    }
})

module.exports = mongoose.model("adminModel",adminSchema,"admin")
console.log("Admin schema is working")