import Joi from 'joi';

export const activateCardSchema = Joi.object({
    id: Joi.number().required(),
    securityCode: Joi.string().length(3).pattern(/[0-9]{3}/),
    password: Joi.string().length(4).pattern(/[0-9]{4}/)
})