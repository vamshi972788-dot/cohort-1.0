
const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
    follower:{
        type: String,
    },
    following:{
        type: String,
    },

},{
    timestamps:true

})

 followSchema.index({follower:1,following:1},{unique:true})

const followmodel = mongoose.model("Follow", followSchema)

module.exports = followmodel
