import { pool } from '../db.js'

export class paymentTypesController {
    async getPaymentTypes(req, res) {
        try {
            const paymentTypes = await pool.query(`SELECT * FROM payment_types`)
            res.json(paymentTypes.rows)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async createPaymentType(req, res) {
        try {
            const { type } = req.body
            const paymentType = await pool.query(`INSERT INTO payment_types ( type ) values ( $1 ) RETURNING *`, [type])
            res.json(paymentType.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async deletePaymentType(req, res) {
        try {
            const paymentTypeId = req.params.id
            const paymentType = await pool.query(`DELETE FROM payment_types where id = $1`, [paymentTypeId])
            res.json(paymentType.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}