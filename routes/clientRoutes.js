import express from "express";
import { clientController } from '../controllers/clientController.js'
export const router = express.Router()
const controller = new clientController

router.delete('/delete_client/:id', controller.deleteClient)
router.get('/get_clients', controller.getClients)