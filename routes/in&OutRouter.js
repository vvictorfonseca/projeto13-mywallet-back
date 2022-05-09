import { Router } from "express";

import { newInsert, getInserts } from "../controllers/in&OutsController.js";
import { validNewInsert, validToken } from "../middlewares/in&OutMiddleware.js"

const inAndOutRouter = Router();

inAndOutRouter.post("/inserts", validToken, validNewInsert, newInsert);
inAndOutRouter.get("/inserts", validToken, getInserts);

export default inAndOutRouter;