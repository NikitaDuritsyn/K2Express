import { pool } from '../db.js'

export class depositsController {
    async getDeposits(req, res) {
        try {
            const deposits = await pool
                .query(`SELECT * FROM deposits`)
            res.json(deposits.rows)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async createDeposit(req, res) {
        try {
            const { visitor, visitorDeposits } = req.body
            for (let i = 0; i < visitorDeposits.length; i++) {
                await pool
                    .query(
                        `INSERT INTO deposits (visitor_id, payment_type_id, client_id, deposit_value) values ($1, $2, $3, $4)`,
                        [visitor.id, visitorDeposits[i].payment_type_id, visitor.client_id, visitorDeposits[i].deposit_value]
                    )
            }
            res.json()
        } catch (e) {
            res.json('Ошибка ' + e.name + ":\n " + e.message)
        }
    }

    async getDepositsByVisitorsId(req, res) {
        try {
            const deposits = await pool.query(`SELECT * FROM deposits WHERE visitor_id IN (${req.body})`)
            res.json(deposits.rows)
        } catch (e) {
            res.json('Ошибка ' + e.name + ":\n " + e.message)
        }
    }
}