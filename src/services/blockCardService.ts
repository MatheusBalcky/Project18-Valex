import { verifyCardId, verifyExpirationDate } from './activateCardService';
import { comparePasswords } from '../utils/bcryptUtils';

export async function blockCardService(cardId: number, password: string) {

    const cardFound = await verifyCardId(cardId);
    
    verifyExpirationDate(cardFound.expirationDate);

    verifyIfTheCardIsAlreadyBlocked(cardFound.isBlocked);

    authenticateCardPassword(password, cardFound.password);
}

function verifyIfTheCardIsAlreadyBlocked(isBlocked: boolean){
    if(isBlocked){
        throw { code: 'CardAlreadyBlocked', message: 'Your card is already blocked!' }
    }
}

export function authenticateCardPassword(passwordToAuth: string, passwordCrypted: any){
    const compareResult = comparePasswords(passwordToAuth, passwordCrypted);
    if(!compareResult){
        throw { code: 'IncorrectPassword', message: 'Your password is incorrect, try again, be careful not to block the card!'}
    }
}