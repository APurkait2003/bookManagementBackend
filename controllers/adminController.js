const adminSchema = require("../model/admin")

const jwt = require('jsonwebtoken')

const bcrypt = require("bcrypt")
const hassPass = (input)=>{
    const salt = bcrypt.genSaltSync(10)
    const hass = bcrypt.hashSync(input,salt)
    return hass;
}

const adminSignup = async(req,res)=>{
    try{
        const existsAdmin = await adminSchema.findOne({"mail" : req.body.mail})

        if(!existsAdmin){
            const adminInfo = await adminSchema.create({
                "mail" : req.body.mail,
                "password" : hassPass(req.body.password)
            })

            if(!adminInfo){
                return res.status(501).json({Message : "Admin not added."})
            }
            else{
                return res.status(200).json({Message : "Signup successfully."})
            }
        }
    }
    catch(error){
        return res.status(501).json(error)
    }
}

const adminSignin = async(req,res)=>{
    try{
        const existsAdmin = await adminSchema.findOne({"mail" : req.body.mail})

        if(!existsAdmin){
            return res.status(501).json({Message : "Admin not find. Signup first."})
        }
        else{
            const adminPass = existsAdmin.password
            const isValid = bcrypt.compareSync(req.body.password, adminPass)

            if(isValid){
                let token = jwt.sign({"password" : existsAdmin.password},process.env.privateKey,{expiresIn : "1h"})
                return res.status(200).json({Message : "Login successfully.", token : token})
            }
            else{
                return res.status(501).json({Message : "Wrong Password ."})
            }
        }
    }
    catch(error){
        return res.status(501).json(error)
    }
}

module.exports = {
    adminSignup,
    adminSignin
}
console.log("Admin controller is working.")