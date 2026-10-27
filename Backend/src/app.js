
const express = require("express")
const cookieparser = require("cookie-parser")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

//require routes
const authroutes = require("./routes/auth.routes")
const postrouter = require("./routes/post.routes")
const userrouter = require("./routes/user.routes")

//using routes
app.use("/api/auth",authroutes)
app.use("/api/posts",postrouter)
app.use("/api/users",userrouter)

module.exports = app
