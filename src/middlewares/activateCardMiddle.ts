import { Request, Response, NextFunction } from "express";
import { activateCardSchema } from "../schemas/activateCardSchema";

export async function activateCardMiddle(req :Request, res :Response, next :NextFunction) {
    
    activateCardValidateBySchema(req.body);
    
    next()
}


function activateCardValidateBySchema(requestData: object){
    const { error } = activateCardSchema.validate(requestData)
    if(error){
        throw {
            code: 'InvalidEntity',
            message: 'Card activation fields filled in invalidly.',
            messageDetail: error.details[0].message
        }
    }
}