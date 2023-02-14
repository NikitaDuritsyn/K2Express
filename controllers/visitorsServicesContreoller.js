import { pool } from '../db.js'

export class visitorsServicesContreoller {
    async createVisitorService(req, res) {
        try {
            const { visitor_id, service_id } = req.body
            const visitor_service = await pool.query(`INSERT INTO visitors_services ( visitor_id, service_id ) values ( $1, $2 ) RETURNING *`, [visitor_id, service_id])
            res.json(visitor_service.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}