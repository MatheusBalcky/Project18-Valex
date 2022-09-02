import { Router } from "express";
import { createCardMiddle } from "../middlewares/createCardMiddle";
import { createCard } from "../controllers/createCardController";
// import { activateCardMiddle } from "../middlewares/activateCardMiddle";

const routes = Router();


routes.post('/createCard', createCardMiddle ,createCard);

//routes.patch('/activateCard', activateCardMiddle);

export default routes