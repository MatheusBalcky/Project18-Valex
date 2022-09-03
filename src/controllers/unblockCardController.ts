import { Request, Response } from "express";
import { unblockCardService } from "../services/unblockCardService";
import { update } from "../repositories/cardRepository";

export async function unblockCardController(req :Request, res :Response) {
    const id = Number(req.params.id);
    const { password } = req.body;

    await unblockCardService(id, password);

    await unblockCard(id, {isBlocked: false})

    res.status(200).send('Your card was unblocked with success');
}

async function unblockCard(cardId: number, dataToBlock: object){
    await update(cardId, dataToBlock);
}