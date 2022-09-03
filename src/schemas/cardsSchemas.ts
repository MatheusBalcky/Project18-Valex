import Joi from 'joi';

export const activateCardSchema = Joi.object({
    id: Joi.number().required(),
    securityCode: Joi.string().length(3).pattern(/[0-9]{3}/),
    password: Joi.string().length(4).pattern(/[0-9]{4}/)
});

export const createCardSchema = Joi.object({
    employeeId: Joi.number().required(),
    type: Joi.string().required()
});

export const blockCardSchema = Joi.object({
    password: Joi.string().length(4).pattern(/[0-9]{4}/)
})