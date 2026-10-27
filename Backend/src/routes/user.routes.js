
const express = require("express");

const usercontroller = require("../controller/user.controller")

const identifiyuser = require("../middleware/auth.middleware")


const userRouter = express.Router();

//post//api/users/follow/:username
userRouter.post("/follow/:username",identifiyuser,usercontroller.followusercontroller)

//post//api/users/unfollow/:username
userRouter.post("/unfollow/:username",identifiyuser,usercontroller.unfollowusercontroller)

module.exports = userRouter;