import { Request, Response } from "express";
import { blockCardService } from "../services/blockCardService";
import { update } from "../repositories/cardRepository";

export async function blockCardController(req :Request, res :Response) {
    const id = Number(req.params.id);
    const { password } = req.body;

    await blockCardService(id, password);

    await blockCard(id, {isBlocked: true})

    res.status(200).send('Your card was blocked with success');
}

async function blockCard(cardId: number, dataToBlock: object){
    await update(cardId, dataToBlock);
}