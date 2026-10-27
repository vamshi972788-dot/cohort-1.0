
const jwt = require("jsonwebtoken")

async function identifiyuser(req,res,next){

 const token = req.cookies.token

   if(!token){
     return res.status(401).json({
        message:"user token unauthrzied"
     })
   }
   
   let decoded = null;

   try{
     decoded = jwt.verify(token,process.env.JWT_SECRET)
     
   } catch (err) {
     return res.status(401).json({
        message:"user not authorized"
     })
   }

   req.user = decoded;
    next()
}

module.exports = identifiyuser

   