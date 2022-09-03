import { Request, Response, NextFunction} from "express";

export async function errorHandler (error: any, req :Request, res :Response, next :NextFunction) {
    
    if(error.code === 'NotFoundCompany' || error.code === 'NotFoundEmployee' || error.code === 'InvalidCard'){
        return res.status(404).send(error.message);
        // Not found
    };

    if( error.code === 'InvalidCardType' || error.code === 'InvalidEntity'){
        return res.status(422).send({ error: error.message, moreDetails: error.messageDetail});
        // Unprocessable Entity
    };

    if(error.code === 'DoubleCardError'){
        return res.status(409).send(error.message);
        // Conflict
    }

    if(error.code === 'ExpiredCard' || error.code === 'CardAlreadyActivated'){
        return res.status(405).send(error.message);
        // Not allowed
    }

    if(error.code === 'SecurityCodeIncorrect'){
        return res.status(403).send(error.message);
        // Forbidden
    }

    console.log(error);
    return res.sendStatus(500);
}