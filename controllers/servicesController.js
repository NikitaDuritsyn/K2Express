import { pool } from '../db.js'

export class servicesController {
    async createService(req, res) {
        try {
            const { name, price } = req.body
            const service = await pool.query(`INSERT INTO services ( name, price ) values ( $1, $2 ) RETURNING *`, [name, price])
            res.json(service.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async getAllServices(req, res) {
        try {
            const services = await pool.query(`SELECT * FROM services`)
            res.json(services.rows)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}