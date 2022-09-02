import { Request, Response, NextFunction } from "express";
import { createCardSchema } from "../schemas/createCardSchema";
import { TransactionTypes } from "../repositories/cardRepository";

export async function createCardMiddle(req :Request, res :Response, next :NextFunction) {
    const cardData = req.body;

    cardSchemaValidation(cardData);

    verifyCardType(cardData.type);

    next();
}

function verifyCardType(type: TransactionTypes){
    if(!['groceries', 'restaurants', 'transport', 'education', 'health'].includes(type)){
        throw { code: 'InvalidCardType', message: 'Card type invalid'}
    }
}

function cardSchemaValidation(cardData: object){
    const { error } = createCardSchema.validate(cardData);
    if(error){
        throw { code: 'InvalidEntity', message: error.details[0].message }
    }
}