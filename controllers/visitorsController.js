import { pool } from '../db.js'

export class visitorsController {
    async createVisitorNotSession(req, res) {
        // try {
        //     console.log(req.body);
        //     const { tariff_id, name, lastname, number_phone, deposit, deponent, status } = req.body
        //     const visitor = await pool.query(`INSERT INTO visitors ( tariff_id, name, lastname, number_phone, deposit, deponent, status) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [tariff_id, name, lastname, number_phone, deposit, deponent, status])
        //     res.json(visitor.rows[0])
        // } catch (e) {
        //     console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        // }
    }
    async createVisitor(req, res) {
        try {
            const sessionId = req.params.id
            const { lastname, name, number_phone, tariff_id } = req.body
            const visitor = await pool.query(`INSERT INTO visitors (session_id, tariff_id, name, status) values ($1, $2, $3, $4) RETURNING *`, [sessionId, tariff_id, name, 'booked'])
            if (number_phone) {
                const clientIdFound = await pool.query('SELECT id FROM clients WHERE number_phone = $1', [number_phone])
                if (clientIdFound.rows[0]) {
                    await pool.query(`UPDATE visitors SET client_id = ${clientIdFound.rows[0].id} WHERE id = ${visitor.rows[0].id}`)
                } else {
                    const client = await pool.query(`INSERT INTO clients (name, lastname, number_phone) values ($1, $2, $3) RETURNING *`, [name, lastname, number_phone])
                    await pool.query(`UPDATE visitors SET client_id = ${client.rows[0].id} WHERE id = ${visitor.rows[0].id}`)
                }
            }
            res.json(visitor.rows[0])
        } catch (e) {
            res.json('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack)
        }
    }
    async getAllVisitors(req, res) {
        try {
            const visitors = await pool.query(`SELECT * FROM visitors`)
            res.json(visitors.rows)
        } catch (e) {
            res.json('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack)
        }
    }
    async getAllVisitorsSession(req, res) {
        try {
            const sessionId = req.params.id
            const visitors = await pool.query(`SELECT * FROM visitors where session_id = $1`, [sessionId])
            res.json(visitors.rows)
        } catch (e) {
            res.json('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack)
        }
    }
    async updateVisitors(req, res) {
        try {
            const updateData = req.body.updateData
            const visitorsId = req.body.visitorsId
            for (const key in updateData) {
                if (updateData.hasOwnProperty.call(updateData, key)) {
                    const value = updateData[key];
                    if (value && key != 'id') {
                        await pool.query(`UPDATE visitors SET ${key} = '${value}' WHERE id IN (${visitorsId})`)
                    }
                }
            }
            res.json().status(200)
        } catch (e) {
            res.json('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack)
        }
    }
}
