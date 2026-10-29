
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service:"gmail",


    
    auth:{
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        clientId: process.env.GOOGLE_CLIENT_ID
    }
})

transporter.verify()
.then(() =>{console.log("email transporter ready to send emails")})
.catch((err) =>{console.error("email transporter verfication failed",err)});

export async function sendEmail({to,subject,html,text}){

    const mailoption ={
        from:process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    };

    const details = await transporter.sendMail(mailoption);
    console.log("Email sent:",details)
}