import { pool } from '../db.js'

export class clientServicesContreoller {
    async createClientServices(req, res) {
        try {
            const { client_id, service_id } = req.body
            const client_service = await pool.query(`INSERT INTO client_services ( client_id, service_id ) values ( $1, $2 ) RETURNING *`, [client_id, service_id])
            res.json(client_service.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}