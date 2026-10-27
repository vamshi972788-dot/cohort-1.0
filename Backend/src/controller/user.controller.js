
const followmodel = require("../model/follow.model");
const usermodel = require("../model/user.model")

async function followusercontroller(req,res){

    const followerusername = req.user.username
    const followingusername = req.params.username

    if(followerusername === followingusername){
        return res.status(400).json({
            message:"you cannot follow yourself"
        })
    }

    const isfollowexists = await usermodel.findOne({
        username:followingusername
    })

    if(!isfollowexists){
        return res.status(404).json({
            message:"the user you are trying to follow does not exist"
        })
    }

    const isalreadyfollowing = await followmodel.findOne({
        follower:followerusername,
        following:followingusername
    })

    if(isalreadyfollowing){
        return res.status(200).json({
            message:`you are already following ${followingusername}`,
            follow:isalreadyfollowing
        })
    }

    const followRecord = await followmodel.create({
        follower:followerusername,
        following:followingusername
    })

        res.status(201).json({
            message:`you are now following ${followingusername}`,
            follow :followRecord
        })
}

async function unfollowusercontroller(req,res){

    const followerusername = req.user.username
    const followingusername = req.params.username

    const isuserfolloweing = await followmodel.findOne({
        follower:followerusername,
        following:followingusername
    })

    if(!isuserfolloweing){
        return res.status(400).json({
            message:`you are not following ${followingusername}`
        })
    }

    await followmodel.findOneAndDelete(isuserfolloweing._id)

    res.status(200).json({
        message:`you have unfollowed ${followingusername}`
    })
}
        
        
    


module.exports = {
    followusercontroller,
    unfollowusercontroller
}