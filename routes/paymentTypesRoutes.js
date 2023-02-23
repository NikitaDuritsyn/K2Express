import express from "express";
import { paymentTypesController } from '../controllers/paymentTypesController.js'
export const router = express.Router()
const controller = new paymentTypesController

router.get('/get_payment_types', controller.getPaymentTypes)
router.post('/create_payment_type', controller.createPaymentType)
router.delete('/delete_payment_type/:id', controller.deletePaymentType)