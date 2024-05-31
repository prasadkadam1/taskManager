const express = require('express')
let app = express()
const userRoute = require("./router/userRoute.js")
const cors = require("cors")
const dotenv = require("dotenv")
let mongoose = require("mongoose")

//using middldeware

dotenv.config()
app.use(cors())
app.use(userRoute)
app.use(express.json())



//connecting db
mongoose.connect(process.env.URI).then(() => { console.log("connected successfully") }).catch(err => console.log(err))
app.listen(process.env.PORT || 8000, (err) => { if (err) { console.log(err) } else { console.log("running successfully ") } })
