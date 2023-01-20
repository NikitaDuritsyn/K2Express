import express from "express";
import { clientController } from '../controllers/clientControllers.js'
export const router = express.Router()
const controller = new clientController

router.get('/get_clients', controller.createClient)