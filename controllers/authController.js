import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import db from "../db.js";

async function signUp(req, res) {

    console.log("entrouSIGNUP")

    const user =  req.body;
    const passwordHash = bcrypt.hashSync(user.password, 10);
    const confirmPasswordHash = bcrypt.hashSync(user.confirmPassword, 10);

    try {
        await db.collection("users").insertOne({...user, password: passwordHash, confirmPassword: confirmPasswordHash});

        res.status(201).send("Usuário criado com sucesso!")
        return;
    
    }catch (e){
        console.log(e);
        res.status(422).send("Erro ao cadastrar um novo usuário")
        return;
    }
}

async function signIn(req, res) {
    const { email } = req.body

    try{
        const user = await db.collection("users").findOne({email: email});
        const token = uuid()
            
        await db.collection("sessions").insertOne({token, userId: user._id })

        console.log(token)
        
        return res.send({token:token, name:user.name}).status(201);
        
    }catch (e){
        console.log(e);
        res.status(422).send("Erro ao entrar!")
    }
}

async function logoutUser(req,res){

    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ','').trim();

    if(!token) {
        return res.status(401).send("No Token")
    }

    try{
        
        const session = await db.collection("sessions").findOne({token});
        if(!session) return res.sendStatus(404)
        
        
        const user = await db.collection("users").findOne({_id:session.userId});
        if(!user) return res.sendStatus(401);

        await db.collection("sessions").updateOne({userId: new ObjectId(user._id)},{$set:{token:""}});
        res.sendStatus(204)  
    
    }catch (e){
        console.log(e)
    }
}

export {signUp, signIn, logoutUser};