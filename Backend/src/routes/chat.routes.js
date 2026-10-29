
import { Router } from "express";
import { sendMessages,getchats,getmessages,deletechat } from "../controller/chat.controller.js";
import { authuser } from "../middleware/auth.middleware.js";

const chatRouter = Router();

chatRouter.post("/message",authuser,sendMessages)

chatRouter.get("/",authuser,getchats)

chatRouter.get("/:chatId/messages",authuser,getmessages)

chatRouter.delete("/delete/:chatId", authuser, deletechat);


export default chatRouter;