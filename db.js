import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URL);
const promise = mongoClient.connect();
promise.then(() => {
    db = mongoClient.db(process.env.BANCO_MONGO);
});
promise.catch( e => console.log(chalk.bold.red(`Deu ruim pra conectar no banco`, e)));

export default db;