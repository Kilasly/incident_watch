const customAPIError = require("../cutsomError/customError")
const User = require("../model/userModel")
const {StatusCodes}=require('http-status-codes')

const registerUser=async(req,res)=>{
     const {name,email,password}=req.body
     if(!name){
        throw new customAPIError("Insert Name",StatusCodes.BAD_REQUEST)
    }
    if(!email){
        throw new customAPIError("Insert Email", StatusCodes.BAD_REQUEST)
    }
    if(!password){
        throw new customAPIError("Insert Password", StatusCodes.BAD_REQUEST)
    }

   
    const user=await User.findOne({email:email})
    if(user){
        throw new customAPIError("Email already exists",400)
    }
    const newUser=await User.create({name,email,password}) 
    const token=await newUser.signJWT()
    if(!token){
        throw new customAPIError("Invalid Token",StatusCodes.BAD_REQUEST)
    }
    res.status(201).json(token)
   
   



}

const loginUser=async(req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user){
        throw new customAPIError("Invalid Credentials",StatusCodes.BAD_REQUEST)
    }
    const isMatch=await user.verifyPassword(password)
    console.log(isMatch)
    if(!isMatch){
        throw new customAPIError("Wrong Password",StatusCodes.UNAUTHORIZED)

    }
    const token=await user.signJWT()
    if(!token){
        throw new customAPIError("Invalid Token",StatusCodes.BAD_REQUEST)
    }
    res.status(200).json(token)


}


module.exports={
    registerUser,
    loginUser
}