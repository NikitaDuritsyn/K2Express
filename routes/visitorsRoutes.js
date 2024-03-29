import express from "express";
import { visitorsController } from '../controllers/visitorsController.js'
export const router = express.Router()
const controller = new visitorsController

router.get('/get_visitors', controller.getAllVisitors)
router.get('/get_visitors/:id', controller.getAllVisitorsBySession)
router.post('/create_visitor/:id', controller.createVisitor)
router.post('/create_visitor', controller.createVisitorNotSession)
router.put('/update_visitors', controller.updateVisitors)