import { Router } from "express";
import  { signUp, signIn }  from "../controllers/authController.js";

import { validEmailAlreadyRegistered, validJoiSignUp, validSignIn, validJoiSignIn } from "../middlewares/authMiddlewares.js"

const authRouter = Router();

authRouter.post("/sign-up", validEmailAlreadyRegistered, validJoiSignUp, signUp);
authRouter.post("/sign-in", validSignIn, validJoiSignIn, signIn);

export default authRouter;