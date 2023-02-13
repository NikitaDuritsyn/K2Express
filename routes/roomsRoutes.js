import express from "express";
import { roomsController } from '../controllers/roomsController.js'
export const router = express.Router()
const controller = new roomsController

router.post('/create_room', controller.createRoom)