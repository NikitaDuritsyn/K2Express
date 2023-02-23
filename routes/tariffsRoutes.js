import express from "express";
import { tariffsController } from '../controllers/tariffsController.js'
export const router = express.Router()
const controller = new tariffsController

router.get('/get_tariffs', controller.getAllTariffs)
router.post('/create_tariff', controller.createTariff)
router.delete('/delete_tariff/:id', controller.deleteTariff)