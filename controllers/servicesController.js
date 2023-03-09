import { pool } from '../db.js'

export class servicesController {
    async createService(req, res) {
        try {
            const { title, price } = req.body
            const service = await pool.query(`INSERT INTO services ( title, price ) values ( $1, $2 ) RETURNING *`, [title, price])
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
    async deleteService(req, res) {
        try {
            const serviceId = req.params.id
            const service = await pool.query(`DELETE FROM services where id = $1`, [serviceId])
            res.json(service.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async getServiceById(req, res) {
        try {
            const serviceId = req.params.id
            const service = await pool.query(`SELECT * FROM services where id = $1`, [serviceId])
            res.json(service.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}