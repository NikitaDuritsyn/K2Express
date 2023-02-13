import express from "express";
import { servicesController } from '../controllers/servicesController.js'
export const router = express.Router()
const controller = new servicesController

router.get('/get_services', controller.getAllServices)
router.post('/create_service', controller.createService)