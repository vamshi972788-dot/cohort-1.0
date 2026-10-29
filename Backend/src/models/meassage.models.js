
import mongoose from "mongoose";

const meassageSchema = new mongoose.Schema(
    {
        chat:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Chat",
            required:true
        },

        content:{
            type:String,
            required:true
        },

        role:{
            type:String,
            enum:["user","ai"],
            required:true
        },

        sources: [{
            title: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }]
    },
    {timestamps:true}
)

const messagemodel = mongoose.model("messages",meassageSchema);

export default messagemodel;
