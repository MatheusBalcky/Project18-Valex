import { Request, Response, NextFunction } from "express";
import * as cardsSchemas from "../schemas/cardsSchemas";

export async function activateCardMiddle(req :Request, res :Response, next :NextFunction) {
    
    activateCardValidateBySchema(req.body);
    
    next()
}


function activateCardValidateBySchema(requestData: object){
    const { error } = cardsSchemas.activateCardSchema.validate(requestData)
    if(error){
        throw {
            code: 'InvalidEntity',
            message: 'Card activation fields filled in invalidly.',
            messageDetail: error.details[0].message
        }
    }
}