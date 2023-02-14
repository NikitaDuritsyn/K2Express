import express from "express";
import { visitorsServicesContreoller } from '../controllers/visitorsServicesContreoller.js'
export const router = express.Router()
const controller = new visitorsServicesContreoller

router.post('/creaete_visitor_service', controller.createVisitorService)