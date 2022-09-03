import { Router } from "express";
import { createCardMiddle } from "../middlewares/createCardMiddle";
import { createCard } from "../controllers/createCardController";
import { activateCardMiddle } from "../middlewares/activateCardMiddle";
import { activateCardController } from "../controllers/activateCardController";

const routes = Router();


routes.post('/createCard', createCardMiddle ,createCard);

routes.patch('/activateCard', activateCardMiddle, activateCardController);

export default routes