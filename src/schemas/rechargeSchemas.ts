import Joi from "joi";

export const rechargeSchema = Joi.object({
    amount: Joi.number().min(1).required()
});