
import mongoose from "mongoose";

async function connectDB() {

      try{
        await mongoose.connect(process.env.MONGO_URI)

         console.log("database connected")
      }catch(err){
        console.log("database is not connected",err)
      }
      
}

export default connectDB;



