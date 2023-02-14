import express from "express";
import { usersController } from '../controllers/usersController.js'
export const router = express.Router()
const controller = new usersController

router.post('/create_user', controller.createUser)