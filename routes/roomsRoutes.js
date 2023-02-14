import express from "express";
import { roomsController } from '../controllers/roomsController.js'
export const router = express.Router()
const controller = new roomsController

router.get('/get_rooms', controller.getRooms)
router.post('/create_room', controller.createRoom)
router.delete('/delete_room/:id', controller.deleteRoom)