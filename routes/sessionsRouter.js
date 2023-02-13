import express from "express";
import { sessionsController } from "../controllers/sessionsController.js"
export const router = express.Router()
const controller = new sessionsController


router.get('/get_sessions', controller.getAllSessions)
router.post('/create_session', controller.createSession)
