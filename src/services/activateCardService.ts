import * as cardsRepositories from "../repositories/cardRepository"
import * as cryptr from '../utils/cryptrUtils'
import * as bcrypt from '../utils/bcryptUtils'

export async function activateCardService(activateData: any) {
    
    const cardFound = await verifyCardId(activateData.id);

    verifyExpirationDate(cardFound.expirationDate);

    verifyIfTheCardIsActivated(cardFound.password);

    validateSecurityCode(cardFound.securityCode, activateData.securityCode);

    const encryptedPassowrd = bcrypt.hashPassword(activateData.password);

    return {password: encryptedPassowrd};
}


export async function verifyCardId(cardId: number){
    const card = await cardsRepositories.findById(cardId);
    if(!card){
        throw { code: 'InvalidCard', message: "Card id invalid, not found!"}
    }
    return card;
}

export function verifyExpirationDate(expirationDate: any){
    const cardExpirationDate = expirationDate;
    const currentDate = new Date();

    const currentMonth = Number(currentDate.getMonth()+1);
    const currentYear = Number(String(currentDate.getFullYear()).slice(2));
    const expirationCardYear = Number(cardExpirationDate.slice(2));
    const expirationCardMonth = Number(cardExpirationDate.slice(0,1));

    if(expirationCardYear <= currentYear && expirationCardMonth <= currentMonth){
        throw { code: 'ExpiredCard', message: 'This card has expired!'}
    }
}

//* Um cartão é considerao ativado se ele já tem senha
function verifyIfTheCardIsActivated(password: any){
    if(password !== null){
        throw { code: 'CardAlreadyActivated', message: 'This card is already activated!'}
    }
}

function validateSecurityCode(securityCode: string, securityCodeToValidate: string){
    if(Number(cryptr.decryptByCryptr(securityCode)) !== Number(securityCodeToValidate)){
        throw {
            code: 'SecurityCodeIncorrect',
            message: 'Your security code is incorrect, check the code on the back of your card and try again!'
        }
    }
}