import { Request, Response } from "express";
import { RechargeInsertData } from "../repositories/rechargeRepository";
import { rechargeCardService } from "../services/rechargeCardService";
import * as rechargeRepositories from '../repositories/rechargeRepository'

export async function rechargeCardController(req :Request, res :Response ) {
    const cardId = Number(req.params.id);
    const { amount } = req.body;

    await rechargeCardService(cardId);

    await rechargeCard({ cardId, amount});

    res.status(200).send('Card recharged with success!');
}

async function rechargeCard(rechargeData: RechargeInsertData){
    await rechargeRepositories.insert(rechargeData);
}