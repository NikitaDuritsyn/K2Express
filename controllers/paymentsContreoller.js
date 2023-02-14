import { pool } from '../db.js'

export class paymentsContreoller {
    async createPayments(req, res) {
        try {
            const { session_id, visitor_id, payment_types_id, payment } = req.body
            const payments = await pool.query(`INSERT INTO payments ( session_id, visitor_id, payment_types_id, payment ) values ( $1, $2, $3, $4 ) RETURNING *`, [session_id, visitor_id, payment_types_id, payment])
            res.json(payments.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}