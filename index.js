import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

import authRouter from "./routes/authRouter.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use(authRouter);

const port = 5000

app.listen( 3500, () => {
    console.log(chalk.bold.green(`Server is good to go on ${port}`))
});