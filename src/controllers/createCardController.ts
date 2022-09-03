import { Request, Response } from "express";
import { createCardService } from "../services/createCardService";
import * as cardsRepositories from "../repositories/cardRepository";
import { decryptByCryptr } from "../utils/cryptrUtils";

export async function createCard(req :Request, res :Response) {
    const apiKey = String(req.headers['x-api-key']);
    const { employeeId, type} = req.body;

    const cardDataToInsert = await createCardService(apiKey, employeeId, type);

    await insertCard(cardDataToInsert);

    res.status(200).send({ yourSecurityCode: decryptByCryptr(cardDataToInsert.securityCode)});
}

async function insertCard(cardData: cardsRepositories.CardInsertData){
    await cardsRepositories.insert(cardData);
}