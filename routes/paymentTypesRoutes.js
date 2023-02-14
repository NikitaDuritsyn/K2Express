import express from "express";
import { paymentTypesController } from '../controllers/paymentTypesController.js'
export const router = express.Router()
const controller = new paymentTypesController

router.post('/create_payment_type', controller.createPaymentType)