import { pool } from '../db.js'

export class paymentTypesController {
    async createPaymentType(req, res) {
        try {
            const { type_name } = req.body
            const payment_types = await pool.query(`INSERT INTO payment_types ( type_name ) values ( $1 ) RETURNING *`, [type_name])
            res.json(payment_types.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}