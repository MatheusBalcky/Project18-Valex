import { Router } from "express";
import { createCardMiddle } from "../middlewares/createCardMiddle";
import { createCard } from "../controllers/createCardController";
import { activateCardMiddle } from "../middlewares/activateCardMiddle";
import { activateCardController } from "../controllers/activateCardController";
import { consultCardMiddle } from "../middlewares/consultCardMiddle";
import { consultCardController } from "../controllers/consultCardController";
import { blockAndUnblockCardMiddle } from "../middlewares/blockAndUnblockCardMiddle";
import { blockCardController } from "../controllers/blockCardController";
import { unblockCardController } from "../controllers/unblockCardController";


const routes = Router();


routes.post('/createCard', createCardMiddle ,createCard);

routes.patch('/activateCard', activateCardMiddle, activateCardController);

routes.get('/consultCard/:id', consultCardMiddle, consultCardController);

routes.patch('/blockCard/:id', blockAndUnblockCardMiddle, blockCardController);

routes.patch('/unblockCard/:id', blockAndUnblockCardMiddle, unblockCardController);




export default routes;