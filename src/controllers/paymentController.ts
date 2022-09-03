import { Request, Response } from "express";
import { PaymentInsertData } from "../repositories/paymentRepository";
import { paymentService } from "../services/paymentService";
import * as paymentRepositories from '../repositories/paymentRepository'

export interface paymentData {
    cardId: number,
    password: string,
    amount: number
}

export async function paymentController(req :Request, res :Response) {
    const businessId  = Number(req.params.businessId);
    const paymentData: paymentData = req.body;

    await paymentService(paymentData, businessId);

    await inserPayment({
        businessId,
        cardId: paymentData.cardId,
        amount: paymentData.amount
    })

    res.status(200).send('Payment succeeded!');
}

async function inserPayment (paymentData: PaymentInsertData){
    await paymentRepositories.insert(paymentData);
}
