import { Request, Response, NextFunction} from "express";

export async function errorHandler (error: any, req :Request, res :Response, next :NextFunction) {
    
    if(error.code === 'NotFoundCompany' || error.code === 'NotFoundEmployee'){
        return res.status(404).send(error.message);
    };

    if( error.code === 'InvalidCardType' || error.code === 'InvalidEntity'){
        return res.status(422).send({ error: error.message, moreDetails: error.messageDetail});
    };

    if(error.code === 'DoubleCardError'){
        return res.status(405).send(error.message);
    }

    console.log(error);
    return res.sendStatus(500);
}