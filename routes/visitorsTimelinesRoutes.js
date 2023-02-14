import express from "express";
import { visitorsTimelinesController } from '../controllers/visitorsTimelinesController.js'
export const router = express.Router()
const controller = new visitorsTimelinesController

router.get('/get_visitors', controller.createVisitorTimeline)