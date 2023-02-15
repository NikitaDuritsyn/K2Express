import express from "express";
import { sessionsController } from "../controllers/sessionsController.js"
export const router = express.Router()
const controller = new sessionsController

router.get('/get_sessions', controller.getAllSessions)
router.get('/get_sessions/:days', controller.getAllSessionsByDaysForChart)
router.post('/create_session', controller.createSession)
router.delete('/delete_session/:id', controller.deleteSession)