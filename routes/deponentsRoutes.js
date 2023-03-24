import express from "express";
import { deponentsController } from '../controllers/deponentsController.js'
export const router = express.Router()
const controller = new deponentsController

router.post('/get_deponents', controller.getDeponentsByVisitorsId)
router.post('/use_deponent', controller.useDeponent)