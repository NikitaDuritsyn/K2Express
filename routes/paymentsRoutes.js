import express from "express";
import { paymentsContreoller } from '../controllers/paymentsContreoller.js'
export const router = express.Router()
const controller = new paymentsContreoller

router.post('/create_payments', controller.createPayments)