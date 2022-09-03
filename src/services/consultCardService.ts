import * as paymentRepositories from '../repositories/paymentRepository'
import * as rechargeRepositories from '../repositories/rechargeRepository'

export async function consultCardService(cardId: number){

    return await organizeAmountAndTransactions(cardId);
    
}


async function organizeAmountAndTransactions (cardId: number){
    let paymentsTotal = 0;
    let rechargesTotal = 0;

    const transactions  = await paymentRepositories.findByCardId(cardId);
    const recharges = await rechargeRepositories.findByCardId(cardId);

    transactions.map( item => paymentsTotal += item.amount);
    recharges.map( item => rechargesTotal+= item.amount );

    const balance = rechargesTotal - paymentsTotal;
    
    const body = {
        balance,
        transactions,
        recharges
    }

    return body
}