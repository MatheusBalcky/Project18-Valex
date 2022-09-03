import dotenv from 'dotenv'; dotenv.config();
import * as companyRepository from "../repositories/companyRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import * as cardsRepository  from "../repositories/cardRepository";
import * as cryptr from '../utils/cryptrUtils';
import { TransactionTypes } from "../repositories/cardRepository";
import { faker } from '@faker-js/faker';

export async function createCardService(apiKey: string, employeeId: number, type: TransactionTypes){
    
    await verifyApiKey(apiKey);

    const employee = await verifyEmployeeExists(employeeId);

    await verifyDoubleCardType(type, employeeId);

    const cardDataToInsert = {
        employeeId,
        number: faker.random.numeric(16),
        cardholderName: formatName(employee.fullName),
        securityCode: createSecurityCode(),
        expirationDate: calculateExpirationDate(),
        password: undefined,
        isVirtual: true,
        originalCardId: undefined,
        isBlocked: false,
        type
    }

    return cardDataToInsert; 
}

async function verifyApiKey(key: string){
    const company = await companyRepository.findByApiKey(key);
    if(!company){
        throw { code: 'NotFoundCompany', message: 'Company not found!' }
    };
}

async function verifyEmployeeExists(employeeId: number){
    const employee =  await employeeRepository.findById(employeeId);
    if(!employee){
        throw { code: 'NotFoundEmployee', message: 'Employee not found!' }
    };
    return employee;
}

async function verifyDoubleCardType(type: TransactionTypes, employeeId: number){
    const result = await cardsRepository.findByTypeAndEmployeeId(type, employeeId);
    if(result){
        throw { code: 'DoubleCardError', message: 'You already have this type of card!' }
    };
}

function createSecurityCode(){
    const securityCodeGenerated = faker.random.numeric(3);
    const securityCodeEncrypted = cryptr.encryptByCryptr(securityCodeGenerated);
    return securityCodeEncrypted;
}

function formatName(fullName: string){
    const fullNameArray: string[] = fullName.split(" ");
    const fullNameFormatedArray: string[] = [];

    fullNameArray.forEach( (element, index, array) => {
        if(index === 0  || index === array.length-1){
            fullNameFormatedArray.push(element);
        } else {
            fullNameFormatedArray.push(element[0]);
        }
    });

    return fullNameFormatedArray.join(" ") .toUpperCase();
}

function calculateExpirationDate(){
    const today = new Date();
    const expirationDate = `${today.getMonth()+1}/${String(today.getFullYear()+5).slice(2)}`;
    return expirationDate;
}