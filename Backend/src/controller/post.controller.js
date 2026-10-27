
const postmodel = require("../model/post.model")
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")
const likemodel = require("../model/like.model")



const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

async function createpostcontroller(req,res){
     
//  console.log(req.body,req.file)

   

  
   
    // const file = await imagekit.files.upload({
    //     file: await toFile(Buffer.from(req.file.buffer),"file"),
    //     fileName:"test"
    // })
     
    const file = await imagekit.files.upload({
    file: await toFile(req.file.buffer, req.file.originalname),
    fileName: req.file.originalname,
    folder:"/posts"
   })
    
    console.log(file)

     const post = await postmodel.create({
      caption:req.body.caption,
      imgUrl:file.url,
      user:req.user.id
   })

   res.status(201).json({
    message:"post created successfully",
    post
   })

}

async function getallpostcontroller(req,res){

    // const token = req.cookies.token

    // if(!token){
    //     return res.status(401).json({
    //         message:"user not authorized"
    //     })
    // }

    //    let decoded;
    // try{
    //     decoded = jwt.verify(token,process.env.JWT_SECRET)
    // }catch(err){
    //      return res.status(401).json({
    //         message:"user not authorized"
    //      })
    // }

    // const userId = decoded.id

    const posts = await postmodel.find({
        user:req.user.id
    })

    

    res.status(200).json({
        message:"posts fetched successfully",
        posts
    })
}

async function getpostDetailscontroller(req,res){

    // const token = req.cookies.token

    // if(!token){
    //     return res.status(401).json({
    //         message:"user not authorized"
    //     })
    // }

    // let decoded;
        
    // try{
    //     decoded = jwt.verify(token,process.env.JWT_SECRET)
    // }catch(err){
    //    res.status(404).json({
    //     message:"token not found"
    //    })
    // }

     const userId = req.user.id;
    const postId = req.params.postId

    const post = await postmodel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }

    const isvaliduser = post.user.toString() === userId

    if(!isvaliduser){
        return res.status(401).json({
            message:"user not authorized to access this post"
        })
    }

    res.status(200).json({
        message:"post fetched successfully",
        post
    })

    

    
}

async function likepostcontroller(req,res){

    const username = req.user.username
    const postId = req.params.postId

    const post = await postmodel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }

    const like = await likemodel.create({
        post:postId,
        user:username
    })

    res.status(200).json({
        message:"post liked successfully",
        like
    })
}

module.exports ={
    createpostcontroller,
    getallpostcontroller,
    getpostDetailscontroller,
    likepostcontroller
}



