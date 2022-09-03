import { Request, Response, NextFunction } from "express";
import { validateAmountGreaterThanZero } from "./rechargeCardMiddle";

export async function paymentMiddle(req :Request, res :Response, next :NextFunction) {
    const { amount } = req.body;

    validateAmountGreaterThanZero({amount});

    next();
}