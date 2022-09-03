import { verifyCardId } from "../services/activateCardService";
import { verifyExpirationDate } from "../services/activateCardService";

export async function rechargeCardService(cardId: number) {
    
    const card = await verifyCardId(cardId);

    verifyIfTheCardsIsActivated(card);

    verifyExpirationDate(card.expirationDate);
}

export function verifyIfTheCardsIsActivated(card: any){
    if(!card.password){
        throw { code: 'CardNotActivatedError', message: 'Your card is not activated!'}
    }
}