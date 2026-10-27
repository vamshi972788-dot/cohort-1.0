
const express = require("express")
const postRouter = express.Router()
const postcontroller = require("../controller/post.controller")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})
const identifiyuser = require("../middleware/auth.middleware")


//post-api/posts
//req.body-{caption,imgUrl}

postRouter.post("/",upload.single("image"),identifiyuser,postcontroller.createpostcontroller)

postRouter.get("/",identifiyuser,postcontroller.getallpostcontroller)

postRouter.get("/details/:postId",identifiyuser,postcontroller.getpostDetailscontroller)

postRouter.post("/like/:postId",identifiyuser,postcontroller.likepostcontroller)

module.exports = postRouter