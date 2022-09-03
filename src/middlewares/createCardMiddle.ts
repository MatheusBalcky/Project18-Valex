import { Request, Response, NextFunction } from "express";
import * as cardsSchemas from "../schemas/cardsSchemas";
import { TransactionTypes } from "../repositories/cardRepository";

export async function createCardMiddle(req :Request, res :Response, next :NextFunction) {
    const cardData = req.body;

    cardSchemaValidation(cardData);

    verifyCardType(cardData.type);

    next();
}

function verifyCardType(type: TransactionTypes){
    if(!['groceries', 'restaurant', 'transport', 'education', 'health'].includes(type)){
        throw { code: 'InvalidCardType', message: 'Card type invalid'}
    }
}

function cardSchemaValidation(cardData: object){
    const { error } = cardsSchemas.createCardSchema.validate(cardData);
    if(error){
        throw { code: 'InvalidEntity', message: error.details[0].message }
    }
}