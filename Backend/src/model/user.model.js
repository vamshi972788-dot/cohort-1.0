
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"this username alreday exists"],
        required:[true,"user name required"]
    },

    email:{
        type:String,
        unique:[true,"this user email alreday exists"],
        required:[true,"user email required"]
    },

    password:{
        type:String,
        require:[true,"password is required"],
    },

    bio:String,
})

const usermodel = mongoose.model("users",userSchema)

module.exports = usermodel



