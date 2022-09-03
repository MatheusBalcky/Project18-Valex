import { Request, Response } from "express";
import { consultCardService } from "../services/consultCardService";


export async function consultCardController(req :Request, res :Response) {
    const cardId =  Number(req.params.id);

    const result = await consultCardService(cardId);

    res.status(200).send(result);
}