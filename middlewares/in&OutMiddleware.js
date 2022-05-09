import Joi from "joi";

import db from "../db.js";

async function validNewInsert(req, res, next){
    
    const { value, description, type } = req.body;

    const regex = /^[1-9][0-9]*,[0-9]{2}$/

    const newInsert = Joi.object(
        {
            value: Joi.string().required().pattern(regex),
            description: Joi.string().min(3).required(),
            type: Joi.valid("income", "outcome").required()
        }
    )

    const {error} = newInsert.validate(req.body, { abortEarly: false });

    if(error){
        return res.status(422).send("Preencha corretamente os dados")
    }

    next();
}

async function validToken(req, res, next){

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();

    console.log("token back", token)

    if(!token) return res.status(422).send("Token não encontrado!");

    try{
        const session = await db.collection("sessions").findOne({ token });
        if(!session) return res.status(422).send("Sessão não encontrada!");

        const user = await db.collection("users").findOne({_id: session.userId});
        if(!user) return res.sendStatus(404);

        res.locals.user = user;

        delete user.password;

        next()
    }catch (e){
        console.log(e);
        res.status(500).send("Error checking error");
    }
}

export { validNewInsert, validToken };