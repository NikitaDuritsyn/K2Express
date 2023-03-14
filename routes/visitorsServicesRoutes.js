import express from "express";
import { visitorsServicesContreoller } from '../controllers/visitorsServicesContreoller.js'
export const router = express.Router()
const controller = new visitorsServicesContreoller

router.post('/creaete_visitor_service', controller.createVisitorService)
router.post('/get_visitors_services', controller.getVisitorsServices)
router.get('/get_visitor_services/:id', controller.getVisitorServices)
router.get('/get_all_visitors_services', controller.getAllVisitorsServices)
router.delete('/delete_visitor_service/:id', controller.deleteVisitorService)