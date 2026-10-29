
import jwt from "jsonwebtoken";

export async function authuser(req,res,next){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            Message:"unauthorized",
            success:false,
            err:"token not provided"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.user = decoded;
        next();

    }catch(err){
        return res.status(401).json({
            Message:"unauthorized",
            success:false,
            err:"invaild token"
        })
    }
}