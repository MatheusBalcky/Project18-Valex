import { Request, Response } from "express";
import { activateCardService } from "../services/activateCardService";
import * as cardsRepositories from "../repositories/cardRepository"


export async function activateCardController(req :Request, res :Response) {
    const activateCardData = req.body;
    
    const result = await activateCardService(activateCardData);

    await activateCard(activateCardData.id, result);

    res.sendStatus(200);
}

async function activateCard(id: number, passwordToRegister: any){
    const result = await cardsRepositories.update(id, passwordToRegister);
    return result
}