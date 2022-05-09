import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

import authRouter from "./routes/authRouter.js"
import inAndOutRouter from "./routes/in&OutRouter.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use(authRouter);
app.use(inAndOutRouter);

const port = 5000;

app.listen( port, () => {
    console.log(chalk.bold.green(`Server is good to go on ${port}`))
});