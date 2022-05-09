import { Router } from "express";

import  { signUp, signIn }  from "../controllers/authController.js";
import { validEmailAlreadyRegistered, validJoiSignUp, validSignIn, validJoiSignIn } from "../middlewares/authMiddlewares.js"

const authRouter = Router();

authRouter.post("/signup", validEmailAlreadyRegistered, validJoiSignUp, signUp);
authRouter.post("/", validSignIn, validJoiSignIn, signIn);

export default authRouter;