import { pool } from '../db.js'

export class clientController {
    async getClients(req, res) {
        try {
            const clients = await pool.query(`SELECT * FROM clients`)
            res.json(clients.rows)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async deleteClient(req, res) {
        try {
            const clientId = req.params.id
            const client = await pool.query(`DELETE FROM clients where id = $1 RETURNING *`, [clientId])
            res.json(client.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}