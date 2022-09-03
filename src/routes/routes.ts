import { Router } from "express";
import { createCardMiddle } from "../middlewares/createCardMiddle";
import { createCard } from "../controllers/createCardController";
import { activateCardMiddle } from "../middlewares/activateCardMiddle";
import { activateCardController } from "../controllers/activateCardController";
import { consultCardMiddle } from "../middlewares/consultCardMiddle";
import { consultCardController } from "../controllers/consultCardController";
import { blockCardMiddle } from "../middlewares/blockCardMiddle";
import { blockCardController } from "../controllers/blockCardController";

const routes = Router();


routes.post('/createCard', createCardMiddle ,createCard);

routes.patch('/activateCard', activateCardMiddle, activateCardController);

routes.get('/consultCard/:id', consultCardMiddle, consultCardController);

routes.patch('/blockCard/:id', blockCardMiddle, blockCardController)

export default routes;