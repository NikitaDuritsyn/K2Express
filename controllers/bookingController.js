import { pool } from '../db.js'

export class bookingController {
    async createBooking(req, res) {
        try {
            const { date, time, timeLine, room, start_time, end_time, deposit, tariff } = req.body[0]
            const booking = await pool.query(`INSERT INTO bookings (date, time, timeLine, room, start_time, end_time, deposit, tariff) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [date, time, timeLine, room, start_time, end_time, deposit, tariff])

            const { name, last_name, number_phone } = req.body[1]
            const client = await pool.query(`INSERT INTO clients (booking_id, name, lastname, number_phone) values ($1, $2, $3, $4) RETURNING *`, [booking.rows[0].id, name, last_name, number_phone])

            res.json([booking.rows[0], client.rows[0]])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async getAllBookings(req, res) {
        try {
            const bookings = await pool.query(`SELECT * FROM bookings`)
            res.json(bookings.rows)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}