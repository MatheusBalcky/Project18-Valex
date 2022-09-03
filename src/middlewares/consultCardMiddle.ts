import { Request, Response, NextFunction } from "express";
import { verifyCardId } from "../services/activateCardService";

export async function  consultCardMiddle (req :Request, res :Response, next :NextFunction) {
    const cardId =  Number(req.params.id);

    await verifyCardId(cardId);

    next();
}