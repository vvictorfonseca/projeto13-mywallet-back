import Joi from "joi";
import bcrypt from 'bcrypt';

import db from "../db.js";

//validação email signUp

async function validEmailAlreadyRegistered(req, res, next) {
    const { email } = req.body
    
    const emailResgistered = await db.collection("users").findOne({ email });

    if (emailResgistered != undefined){
        return res.status(422).send("E-mail já cadastrado!")
    }

    next();
}

//validação Joi SignUp

async function validJoiSignUp(req, res, next) {
    const {name, email, password, confirmPassword} = req.body

    const newRegister = Joi.object(
        {
            name: Joi.string().min(3).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().required(),
        }
    )

    const {error} = newRegister.validate(req.body, { abortEarly: false });

    if (error){
        console.log(error)
        return res.status(422).send("Preencha corretamente os dados")
    }

    next();
}

//validação signIn

async function validSignIn (req, res, next) {

    const { email, password } = req.body

    const user = await db.collection("users").findOne({email:email})

    const correctPassword = bcrypt.compareSync(password, user.password)

    if (!user || !correctPassword){
        return res.status(404).send("Usuário ou senha incorreto")
    }

    res.locals.user = user;

    next();
}

async function validJoiSignIn(req, res, next){
    const { email, password } = req.body;

    const newSignIn = Joi.object(
        {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }
    )

    const {error} = newSignIn.validate(req.body, { abortEarly: false });

    if(error){
        return res.status(402).send("Preencha os campos corretamente!")
    }

    next();
}

export { validEmailAlreadyRegistered, validJoiSignUp, validSignIn, validJoiSignIn };