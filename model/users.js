const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    "user_id" : {
        type : String,
        required : true,
    },
    "mail" : {
        type : String,
        required : [true,"mail is required"],
        validate : {
            validator : (mailValue) =>{
                var mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if(mailRegex.test(mailValue)) return true; return false;
            },
            message : (props)=>{
                return `${props.value} Enter valid mail`
            }
        }
    },
    "password" : {
        type : String,
        required : [true,"password is required"],
        validate : {
            validator : (passValue)=>{
                var passRegex = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?!.*\s).*$/
                if(passRegex.test(passValue)) return true; return false;
            },
            message : (props)=>{
                return `${props.value} Enter valid password`
            }
        }
    }
},{versionKey : false})

module.exports = mongoose.model('userModel',userSchema,'users')
console.log("user model is working")