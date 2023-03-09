import express from "express";
import { servicesController } from '../controllers/servicesController.js'
export const router = express.Router()
const controller = new servicesController

router.post('/create_service', controller.createService)
router.get('/get_services', controller.getAllServices)
router.get('/get_service/:id', controller.getServiceById)
router.delete('/delete_service/:id', controller.deleteService)