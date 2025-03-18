const UserModel = require("../Model/userModel")
const bcrypt = require("bcrypt")
const generateToken = require("../utilities/generateToken")
require('dotenv').config()


const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {

            return res.status(400).json({ error: "All fields are required" })
        }

        const existUser = await UserModel.findOne({ email })

        if (!existUser) {

            return res.status(400).json({ error: "user does not exist" })
        }

        const passwordMatch = await bcrypt.compare(password, existUser.password)

        if (!passwordMatch) {

            return res.status(400).json({ error: "Password does not match" })
        }

        //Token generation 

        const token = generateToken(existUser._id)
        res.cookie("token", token)
        res.cookie("user-token", token)

        res.status(200).json({ message: 'Login Successfull', existUser })
    }
    catch (error) {

        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }

}


const register = async (req, res) => {
    try {

        const { name, email, password } = req.body
        if (!name || !email || !password) {

            return res.status(400).json({ error: "All fields are required" })
        }

        const salt = await bcrypt.genSalt(10)
        const passwordToString = password.toString()
        const hashedPassword = await bcrypt.hash(passwordToString, salt)

        const newUser = new UserModel({ name, email, password: hashedPassword })

        const saved = await newUser.save()

        //token generation
        const token = generateToken(saved._id)
        res.cookie("token", token)
        res.cookie("user-token", token)

        res.status(201).json({ message: 'User Created', saved })

    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }



}

module.exports = {

    loginUser,
    register,


}



