import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from "../db.js";

async function signUp(req, res) {

    const user =  req.body;
    const passwordHash = bcrypt.hashSync(user.password, 10);

    try {
        await db.collection("users").insertOne({...user, password: passwordHash});

        res.status(201).send("Usuário criado com sucesso!")
        return;
    
    }catch (e){
        console.log(e);
        res.status(422).send("Erro ao cadastrar um novo usuário")
        return;
    }
}

export default signUp;