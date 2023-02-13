import express from "express";
import { clientController } from '../controllers/clientsController.js'
export const router = express.Router()
const controller = new clientController

router.get('/get_clients', controller.getAllClients)
router.get('/get_clients/:id', controller.getAllClientsBySessionId)
router.post('/create_clients/:id', controller.createClient)