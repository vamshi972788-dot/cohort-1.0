
const express = require("express")

const authroutes = express.Router()

const authcontroller = require("../controller/auth.controller")
const identifiyuser = require("../middleware/auth.middleware")

authroutes.post("/register",authcontroller.registercontroller)

authroutes.post("/login",authcontroller.logincontroller)

authroutes.get("/get-me",identifiyuser,authcontroller.getmecontroller)

module.exports = authroutes

