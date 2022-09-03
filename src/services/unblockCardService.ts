import { verifyCardId, verifyExpirationDate } from './activateCardService';
import { authenticateCardPassword } from './blockCardService';

export async function unblockCardService(cardId: number, password: string) {

    const cardFound = await verifyCardId(cardId);
    
    verifyExpirationDate(cardFound.expirationDate);

    verifyIfTheCardIsAlreadyBlocked(cardFound.isBlocked);

    authenticateCardPassword(password, cardFound.password);
}

function verifyIfTheCardIsAlreadyBlocked(isBlocked: boolean){
    if(!isBlocked){
        throw { code: 'CardAlreadyUnblocked', message: 'Your card is already unblocked!' }
    }
}