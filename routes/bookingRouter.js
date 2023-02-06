import express from "express";
import { bookingController } from "../controllers/bookingController.js";
export const router = express.Router()
const controller = new bookingController


router.get('/get_bookings', controller.getAllBookings)
router.post('/create_booking', controller.createBooking)
