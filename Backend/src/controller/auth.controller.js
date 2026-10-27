
const usermodel = require("../model/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function registercontroller(req,res) {

    const {email,username,password,bio} = req.body

    

    const isuseralreadyexists = await usermodel.findOne({
        $or :[
            {username},
            {email}
        ]
    })

    if(isuseralreadyexists) {
        return res.status(409).json({
            Message:"user already exists" + (isuseralreadyexists.email == 
            email ? "email already exists" : "username already exists")
        })
    }

    const hash = await bcrypt.hash(password,10)
        
    const user = await usermodel.create({
        username,
        email,
        bio,
        password:hash
    })

    const token = jwt.sign({
        id :user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token)

    res.status(201).json({
        Message:"user register succesfully",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio
        }
    })
}

 async function logincontroller(req,res) {
    const {username,password} =req.body

    const user = await usermodel.findOne({
        $or:[
            {
                username:username
            },

            {
                password:password
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            Message:"user is not found"
        })
    }

    

    const ispasswordvaild = await bcrypt.compare(password,user.password)

    if(!ispasswordvaild){
        return res.status(404).json({
            Message:"password is invaild"
        })
    }

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token)

    res.status(200).json({
        Message:"user is loggedin successfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio
        }
    })
}

async function getmecontroller(req,res) {
    
    const userId = req.user.id

    const user = await usermodel.findById(userId)

    res.status(200).json({
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileimage:user.profileimage
        }
    })
}

module.exports ={
    registercontroller,
    logincontroller,
    getmecontroller
}
