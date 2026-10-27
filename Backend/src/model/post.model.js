
 const mongoose = require("mongoose")

 const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        required:[true,"imgUrl required to create an post"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"userId required to create an post"]
    }
 })

 const postmodel = mongoose.model("posts",postSchema)

 module.exports = postmodel
