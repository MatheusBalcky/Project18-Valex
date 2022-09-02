import Joi from 'joi';

export const createCardSchema = Joi.object({
    employeeId: Joi.number().required(),
    type: Joi.string().required()
});