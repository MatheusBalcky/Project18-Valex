import { Request, Response, NextFunction } from "express";
import * as cardsSchemas from "../schemas/cardsSchemas";

export async function blockAndUnblockCardMiddle (req :Request, res :Response, next :NextFunction) {
    const { password } = req.body;

    validateCardPassword({password});

    next();
}

function validateCardPassword (password: any){
    const { error } = cardsSchemas.blockCardSchema.validate(password);
    if(error){
        throw { 
            code: 'InvalidPassword', 
            message: 'The password is invalid!',
            messageDetails: error.details[0].message
        }
    }
}