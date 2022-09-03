import { Request, Response, NextFunction } from "express";
import { rechargeSchema } from "../schemas/rechargeSchemas";
import { verifyApiKey } from "../services/createCardService";

export async function rechargeCardMiddle(req :Request, res :Response, next :NextFunction) {
    const apiKey = String(req.headers['x-api-key']);
    const { amount } = req.body;

    await verifyApiKey(apiKey);

    validateValueRecharge({amount})

    next();
}

function validateValueRecharge(value: object){
    const { error } = rechargeSchema.validate(value);
    if(error){
        throw { code: 'RechargeValueInvalid', message: 'Your value needs to be greater than 0!'}
    }
}