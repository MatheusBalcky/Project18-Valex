import { Request, Response, NextFunction} from "express";

export async function errorHandler (error: any, req :Request, res :Response, next :NextFunction) {
    
    if(error.code === 'NotFoundEmployee' || error.code === 'InvalidCard'){
        return res.status(404).send({ error: error.message, moreDetails: error.messageDetail});
        // Not found
    };

    if( error.code === 'InvalidCardType' || error.code === 'InvalidEntity' || error.code === 'InvalidPassword'){
        return res.status(422).send({ error: error.message, moreDetails: error.messageDetail});
        // Unprocessable Entity
    };

    if(error.code === 'DoubleCardError'){
        return res.status(409).send({ error: error.message, moreDetails: error.messageDetail});
        // Conflict
    }

    if (error.code === 'ExpiredCard' 
    || error.code === 'CardAlreadyActivated' 
    || error.code === 'CardAlreadyBlocked'
    || error.code === 'InvalidCompanyKey'
    || error.code === 'CardNotActivatedError'
    || error.code === 'InvalidBusiness'
    || error.code === 'CardTypeNotEqualToBusinessType'
    || error.code === 'NotEnoughMoney'){

        return res.status(405).send({ error: error.message, moreDetails: error.messageDetail});
        // Not allowed

    }

    if(error.code === 'SecurityCodeIncorrect' || error.code === 'IncorrectPassword' || error.code === 'RechargeValueInvalid'){
        return res.status(403).send({ error: error.message, moreDetails: error.messageDetail});
        // Forbidden
    }

    console.log(error);
    return res.sendStatus(500);
}