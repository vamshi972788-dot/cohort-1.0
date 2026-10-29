// import { genrateResponse,genrateChatTitle } from "../services/ai.services.js";
// import chatmodel from "../models/chat.models.js"
// import messagemodel from "../models/meassage.models.js";
// import usermodel from "../models/user.models.js";

// export async function sendMessages(req,res){

//     const {message,chat:chatId} = req.body;

    

//     let title = null, chat = null;

//     if(!chatId){
//          title = await genrateChatTitle(message);
//          chat = await chatmodel.create({
//         user:req.user.id,
//         title
//       })
//     }



//     const usermessage = await messagemodel.create({
//         chat:chatId || chat._id,
//         content:message,
//         role:"user"
//     })

//     const messages = await messagemodel.find({chat:chatId})

//      const result = await genrateResponse(messages);

//      const aimessage = await messagemodel.create({
//         chat:chatId || chat._id,
//         content:result,
//         role:"ai"
//      })

//      console.log(messages)
   
  


//     res.status(201).json({
//         title,
//         chat,
//         aimessage,
//         usermessage
//     })


// }



import chatmodel from "../models/chat.models.js";
import messagemodel from "../models/meassage.models.js";
import {
    genrateResponse,
    genrateChatTitle,
    searchWeb,
    TavilySearchError
} from "../services/ai.services.js";

export async function sendMessages(req, res) {
    try {
        const { message, chat: chatId, search = false } = req.body;

        if (typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        if (typeof search !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "Search mode must be a boolean"
            });
        }

        let chat;


        // Existing chat
        if (chatId) {
            chat = await chatmodel.findOne({
                _id: chatId,
                user: req.user.id
            });

            if (!chat) {
                return res.status(404).json({
                    success: false,
                    message: "Chat not found"
                });
            }
        } else {
            // Create new chat
            const title = await genrateChatTitle(message.trim());

            chat = await chatmodel.create({
                user: req.user.id,
                title: title || "New Chat"
            });
        }

        // Save user message first
        const usermessage = await messagemodel.create({
            chat: chat._id,
            content: message.trim(),
            role: "user"
        });

        // Fetch history AFTER saving the user message
        const messages = await messagemodel
            .find({ chat: chat._id })
            .sort({ createdAt: 1 });

        const searchResults = search ? await searchWeb(message.trim()) : [];

        // Generate AI response using message history
        const result = await genrateResponse(messages, searchResults);

        const aiContent =
            typeof result === "string"
                ? result
                : JSON.stringify(result);

        // Save AI message
        const aimessage = await messagemodel.create({
            chat: chat._id,
            content: aiContent,
            role: "ai",
            sources: searchResults.map(({ title, url }) => ({ title, url }))
        });

        return res.status(201).json({
            success: true,
            message: "Message sent successfully",
            chat,
            messages: [usermessage, aimessage]
        });

    } catch (error) {
        console.error("sendMessages error:", error);
        const isTavilyError = error instanceof TavilySearchError;

        return res.status(isTavilyError ? 503 : 500).json({
            success: false,
            message: isTavilyError
                ? error.message
                : "Failed to send message"
        });
    }
}

export async function getchats(req,res){

    const user = req.user;

    const chats = await chatmodel.find({user:user.id})
    
    res.status(200).json({
        message:"chats recvied sucessfully",
        chats
    })
}

export async function getmessages(req,res){

   const {chatId} = req.params;

   const chat = await chatmodel.findOne({
     _id:chatId,
     user:req.user.id
   })

   if(!chat){
     return res.status(404).json({
          message:"chat not found"
     })
   }

   const messages = await messagemodel.find({
     chat:chatId
   })

   res.status(200).json({
     message:"messages recvied successfully",
     messages
   })
}

export async function deletechat(req,res){

    const {chatId} = req.params;

    const chat = await chatmodel.findOneAndDelete({
        _id:chatId,
        user:req.user.id
    })

    await messagemodel.deleteMany({
        chat:chatId
    })

    if(!chat){
       return res.status(404).json({
            message:"chat not found"
        })
    }

    res.status(200).json({
        message:"chat deleted successfully"
    })
}




