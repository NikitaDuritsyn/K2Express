import express from "express";
import { sessionVisitorsStartEndTimeController } from '../controllers/sessionVisitorsStartEndTimeController.js'
export const router = express.Router()
const controller = new sessionVisitorsStartEndTimeController

router.post('/start_time', controller.setStartTime)
router.post('/end_time', controller.setEndTime)