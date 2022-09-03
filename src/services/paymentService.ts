import { verifyCardId } from "../services/activateCardService";
import { verifyIfTheCardsIsActivated } from "./rechargeCardService";
import { verifyExpirationDate } from "../services/activateCardService";
import { paymentData } from "../controllers/paymentController";
import { authenticateCardPassword } from "./blockCardService";
import * as businessRepositories from '../repositories/businessRepository'
import { Card } from "../repositories/cardRepository";
import { organizeAmountAndTransactions } from "./consultCardService";

export async function paymentService(paymentData: paymentData, businessId: number) {

    const card: Card = await verifyCardId(paymentData.cardId);

    verifyIfTheCardsIsActivated(card);

    verifyExpirationDate(card.expirationDate);

    authenticateCardPassword(paymentData.password, card.password);

    verifyIfTheCardIsUnblocked(card);

    const business = await verifyIfTheBusinessIsRegistered(businessId);

    verifyTypePayment(card.type, business.type);

    await calculatePaymentXBalance(paymentData.cardId, paymentData.amount)
}

function verifyIfTheCardIsUnblocked(card: Card){
    if(card.isBlocked){
        throw { code: 'CardBlocked', message: "Your card is blocked you can't make purchases"}
    }
}

async function verifyIfTheBusinessIsRegistered (businessId: number) {
    const business = await businessRepositories.findById(businessId);
    if(!business){
        throw { code: 'InvalidBusiness', message: 'This business does not exist in our system!'}
    }
    return business;
}

function verifyTypePayment (cardType: string, businessType: string){
    if(cardType !== businessType){
        throw { code: 'CardTypeNotEqualToBusinessType', message: 'Your card cannot make purchases in this department.'}
    }
}

async function calculatePaymentXBalance(cardId: number, paymentAmount: number){
    const { balance } = await organizeAmountAndTransactions(cardId);
    if(paymentAmount > balance){
        throw { code: 'NotEnoughMoney', message: 'Your balance account is insufficient for this purchase.'}
    }
}