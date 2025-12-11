const userModel = require("../model/users")

const env = require('dotenv').config()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const hassPass = (input)=>{
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(input,salt)
    return hash
}

const genUserId = "user-"+Math.floor(Math.random()*9999)+"-"+Date.now()

const signup = async(req,res)=>{
    try{
        const existsUser = await userModel.findOne({"mail":req.body.mail})
        if(existsUser){
            return res.status(400).json({"Message" : "mail already exists."})
        }

        const userInfo = await userModel.create({
            "user_id" : genUserId,
            "mail" : req.body.mail,
            "password" : hassPass(req.body.password)
        })
        
        if(!userInfo){
            return res.status(501).json({"Message" : "user not added"})
        }
        else{
            return res.status(200).json({"Message" : "Sign up successfully"})
        }
    }
    catch(error){
        return res.status(501).json(error)
    } 
}

const allUser = async(req,res)=>{
    try{
        const userInfo = await userModel.find()
        if(!userInfo) return res.status(501).json({"Message" : "not found"})
        return res.status(200).json(userInfo)
    }
    catch(error){
        return res.status(501).json(error)
    }
}

const deleteUserById = async(req,res)=>{
    try{
        const userInfo = await userModel.deleteOne({"user_id" : req.params.uid})
        if(!userInfo) return res.status(501).json({"Message" : "unable to delete"})
        return res.status(200).json({"Message" : "Delete successfully"})
    }
    catch(error){
        return res.status(501).json(error)
    }
}

const login = async(req,res)=>{
    try{
        const userInfo = await userModel.findOne({"mail" : req.body.mail})

        if(!userInfo){
            return res.status(501).json({Message : "user not found."})
        }
        else{
           user_pass = userInfo.password
            const isValid = bcrypt.compareSync(req.body.password , user_pass) ? true : false;

            if(isValid){
                var token = jwt.sign({"user_id" : userInfo.user_id},process.env.privateKey,{expiresIn : "1h"})
                return res.status(200).json({"Message" : "login successful","token" : token,"user": {
                        "user_id": userInfo.user_id,
                        "mail": userInfo.mail
                    }})
            }
            return res.status(501).json({"Message" : "Wrong cridential"}) 
        }
        
    }
    catch(error){
        return res.status(501).json(error)
    }
}

const updateUser = async(req,res)=>{
    try{
        const findUser = await userModel.findOne({"mail" : req.body.mail})

        if(!findUser){
            return res.status(501).json({Message : "User not find."})
        }
        else{
            const prevPass = findUser.password
            const samePass = bcrypt.compareSync(req.body.password,prevPass) ? true : false

            if(samePass){
                res.status(501).json({Message : "You entered old password.Please enter new password."})
            }
            else{
                const userInfo = await userModel.updateOne({"mail" : req.body.mail},{$set : {"password" : hassPass(req.body.password)}})

                if(!userInfo){
                    res.status(501).json({Message : "Something Wrong."})
                }
                else{
                    res.status(200).json({Message : "Update Successfully."})
                }
            }
            
        }
    }
    catch(error){
        return res.status(501).json(error)
    }
}

module.exports = {
    signup,
    allUser,
    deleteUserById,
    login,
    updateUser
}
console.log("user controller is working.")