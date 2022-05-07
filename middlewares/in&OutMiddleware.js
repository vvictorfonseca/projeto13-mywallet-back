import Joi from "joi";

import db from "../db";

async function validNewInsert(req, res, next){
    
    const { value, description } = req.body;

    const regex = /^[1-9][0-9]{1,6},[0-9]{2}$/

    const newInsert = Joi.object(
        {
            value: Joi.number().required().pattern(regex)
        }
    )

}