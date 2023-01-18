const User = require("../models/user")

const errorHandler = (res, statusCode, message) => {
    return res.status(statusCode).json({ status: "fail", message: message })
}

module.exports.registerUser = async (req, res) => {
    const {name, email, password, phone} = req.body
    try {
        if(!name || !email || !password || !phone){
            throw new Error("All fields are mandatory")
        }
        const existingUserWithEmail = await User.findOne({email})
        if(existingUserWithEmail){
            throw new Error("Email ID already exists")
        }
        const newUser =  new User({name, email, password, phone})
        await newUser.save()
        return res.status(201).json({
            status: "success",
            message: "User registered Successfully"
        })
    } catch(error) {
        return errorHandler(res, 400, error.message)
    }
}

module.exports.loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const existingUser = await User.findOne({email})
    } catch(error) {
        return errorHandler(res, 400, error.message)
    }
}