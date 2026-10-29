
import { Router } from "express";
import { loginValidator, registerValidation } from "../validation/auth.validation.js";
import { getme, login, logout, register,verifyemail } from "../controller/auth.controller.js";
import { authuser } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register",registerValidation,register);

authRouter.get("/verify-email",verifyemail)

authRouter.post("/login",loginValidator,login)

authRouter.post("/logout",logout)

authRouter.get("/get-me",authuser,getme)

export default authRouter;