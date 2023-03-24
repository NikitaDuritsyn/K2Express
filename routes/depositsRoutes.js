import express from "express";
import { depositsController } from '../controllers/depositsController.js'
export const router = express.Router()
const controller = new depositsController

router.post('/get_deposits', controller.getDepositsByVisitorsId)
router.post('/create_visitor_deposits', controller.createDeposit)