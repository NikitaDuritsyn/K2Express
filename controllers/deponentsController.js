import { pool } from '../db.js'

export class deponentsController {
    async getDeponents(req, res) {
        try {
            const deponents = await pool.query(`SELECT * FROM deponents`)
            res.json(clients.rows)
        } catch (e) {
            res.json('Ошибка ' + e.name + ":\n " + e.message)
        }
    }
    async getDeponentsByVisitorsId(req, res) {
        try {
            const deponents = await pool.query(`SELECT * FROM deponents WHERE visitor_id IN (${req.body})`)
            res.json(deponents.rows)
        } catch (e) {
            res.json('Ошибка ' + e.name + ":\n " + e.message)
        }
    }
    async useDeponent(req, res) {
        try {
            const { visitor, deposit_value } = req.body
            const paymentType = await pool.query(`SELECT * FROM payment_types WHERE type = 'cash'`)
            const updateDeponentStatus = await pool.query(`UPDATE deponents SET status = 'discactive' WHERE visitor_id = $1`, [visitor.id])
            const deposit = await pool.query(
                `INSERT INTO deposits (visitor_id, payment_type_id, client_id, deposit_value) values ($1, $2, $3, $4)`,
                [visitor.id, paymentType.rows[0].id, visitor.client_id, deposit_value]
            )
            res.json(deposit.rows[0])
        } catch (e) {
            res.json('Ошибка ' + e.name + ":\n " + e.message)
        }
    }
}