import { pool } from '../db.js'

export class clientController {
    async createClient(req, res) {
        try {
            // чтобы клиенты по id брони записывались
            // const bookingId = req.params.id .... http://localhost:8080/api/create_clients/:id
            const { name, last_name } = req.body
            const recordClient = await pool.query(`INSERT INTO clients (name, lastname) values ($1, $2) RETURNING *`, [name, last_name])
            res.json(recordClient.rows) //recordClient.rows[0] то не будет в массив обернут а просто будет объект выдавать
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
