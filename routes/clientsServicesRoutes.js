import express from "express";
import { clientServicesContreoller } from '../controllers/clientsServicesContreoller.js'
export const router = express.Router()
const controller = new clientServicesContreoller

router.post('/client_service', controller.createClientServices)