import { pool } from '../db.js'

export class clientController {
    async createClient(req, res) {
        try {
            const bookingId = req.params.id
            const { name, last_name, number_phone } = req.body
            const client = await pool.query(`INSERT INTO clients (booking_id, name, lastname,number_phone) values ($1, $2, $3, $4) RETURNING *`, [bookingId, name, last_name, number_phone])
            res.json(client.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async getAllClient(req, res) {
        try {
            // сделать чтобы клиенты выдавались по id брони
            // const bookingId = req.params.id .... http://localhost:8080/api/get_clients/:id
            const clients = await pool.query(`SELECT * FROM clients`)
            res.json(clients.rows)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}
