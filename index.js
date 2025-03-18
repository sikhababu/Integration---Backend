const express = require('express')
const app = express()
const userRoutes = require ('./Routes/userRoutes')
const {connectDB} = require ('./Config/dbConnection')
const cookieParser = require('cookie-parser')
const cors = require('cors')


//db connection
connectDB()

//Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL
}))

app.use('/user', userRoutes)


app.listen(process.env.PORT,()=>{

    console.log(`server starts on port ${process.env.PORT}`)
})