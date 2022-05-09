import dayjs from "dayjs";

import db from "../db.js";

async function newInsert(req, res){
    const { value, description, type } =  req.body;

    const { user } = res.locals;

    const newInsert = 
    {
        value,
        description,
        type,
        userId: user._id,
        time: dayjs(Date.now()).format("DD/MM")
    }

    try{
        await db.collection("inserts").insertOne(newInsert)

        return res.status(201).send(newInsert)
    
    }catch (e){
        console.log(e);
        return res.sendStatus(422);
    }
}

async function getInserts(req, res){

    const { user } = res.locals;

    try{
        const allInserts = await db.collection("inserts").find({userId: user._id}).toArray();

        return res.status(201).send(allInserts);
    
    }catch(e){
        console.log(e);
        return res.status(422).send("Erro ao enviar os Inserts")
    }
}

export { newInsert, getInserts };