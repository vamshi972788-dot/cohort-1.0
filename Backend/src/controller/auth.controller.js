
import usermodel from "../models/user.models.js";
import jwt from "jsonwebtoken";
import {sendEmail} from "../services/mail.services.js"


export async function register(req,res,next){

    const {username,email,password} = req.body;

    const isallredayregister = await usermodel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isallredayregister){
        return res.status(400).json({
            Message:"user all ready exists",
            status:false  
        })
    }

    const user = await usermodel.create({username,email,password})

    const emailverficationToken = jwt.sign({
        email:user.email
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    await sendEmail({
        to:email,
        subject:"welcome to perplexity",
        html:`
             <p>Hi ${username}</p>
             <p>Thank you for registering <strong>perpelxity.we are excited have you on perplexity </strong> </p>
             <p>please verify your email address by cilcking the link below </p>
             <a href="http://localhost:3000/api/auth/verify-email?token=${emailverficationToken}">Verify Email</a>
             <p>best regards,<br>The perplexity Team</p>
          
        `
    });

    res.status(201).json({
        message:"user registerd successfully",
        success:true,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

export async function verifyemail(req,res){

    const {token} = req.query;

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    const user = await usermodel.findOne({email: decoded.email});

    if(!user){
        return res.status(400).json({
            message:"invaild token",
            success:false,
            err:"user not found"
        })
    }

    user.verified = true;

    await user.save()

    res.send(`
        <h1>Email Verified Successfully</h1>
        <p>your email has been verified.you can now log in your account </P>
        <a href="http://localhost:3000/api/auth/login">Go To Login</a>
        `);
}

export async function login(req,res){

    const {email,password} = req.body;

    const user = await usermodel.findOne({email});

    if(!user){
        return res.status(400).json({
            message:"Invaild email or password",
            success:false,
            err:"user not found"
        })
    }

    const ispasswordvaild = await user.comparePassword(password);

    if(!ispasswordvaild){
        return res.status(400).json({
            message:"Invaild email or password",
            success:false,
            err:"Incorrect password"
        })
    }

    if(!user.verified){
        return res.status(400).json({
            message:"please verify email before you login",
            success:false,
            err:"Email not verified"
        })
    }

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token)

    return res.status(200).json({
        message:"user logged In successfully",
        success:true,
        user:{
            id:user.id,
            username:user.username,
            email:user.email
        }
    })



    



}

export async function getme(req,res){

    const userId = req.user.id;

    const user = await usermodel.findById(userId).select("-password");

    if(!user){
        return res.status(404).json({
            message:"user not found",
            success:"false",
            err:"user not found"
        })       
    }

     res.status(200).json({
        message:"user details fecthed successfully",
        success:"true",
        user
    })


}

export function logout(req, res){
    res.clearCookie("token");
    return res.status(200).json({
        message:"user logged out successfully",
        success:true
    })
}





