import { pool } from '../db.js'

export class visitorsController {
    async createVisitor(req, res) {
        try {
            // НУЖНО УТОЧНИТЬ МОМЕНТ КСТАТИ МОЖЕТ ЛИ ВООБЩЕ ТАКОЕ БЫТЬ ЧТО ДЕПОНЕНТ НЕ ВНЕСЛИ ПРИ БРОНИ
            // Тут еще может быть депонент в Payment, при условии что он есть
            const sessionId = req.params.id
            const { name, last_name, number_phone, status } = req.body
            const visitor = await pool.query(`INSERT INTO visitors (session_id, name, lastname, number_phone, status) values ($1, $2, $3, $4, $5) RETURNING *`, [sessionId, name, last_name, number_phone, status])
            res.json(visitor.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async getAllVisitors(req, res) {
        try {
            const visitors = await pool.query(`SELECT * FROM visitors`)
            res.json(visitors.rows)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async getAllVisitorsSession(req, res) {
        try {
            const sessionId = req.params.id
            const visitors = await pool.query(`SELECT * FROM visitors where session_id = $1`, [sessionId])
            res.json(visitors.rows)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}
