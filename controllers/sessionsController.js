import { pool } from '../db.js'

export class sessionsController {
    async createSession(req, res) {
        try {
            const { date, time_booking, timeLine, room, start_time, end_time, status } = req.body[0]
            const session = await pool.query(`INSERT INTO sessions ( date, time_booking, timeLine, room, start_time, end_time, status) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [date, time_booking, timeLine, room, start_time, end_time, status])

            const { name, last_name, number_phone, tariff_id, status_client } = req.body[1]
            const client = await pool.query(`INSERT INTO clients (session_id, name, lastname, number_phone, tariff_id, status) values ($1, $2, $3, $4, $5, $6) RETURNING *`, [session.rows[0].id, name, last_name, number_phone, tariff_id, status_client])

            // НУЖНО УТОЧНИТЬ МОМЕНТ КСТАТИ МОЖЕТ ЛИ ВООБЩЕ ТАКОЕ БЫТЬ ЧТО ДЕПОНЕНТ НЕ ВНЕСЛИ ПРИ БРОНИ
            // Тут еще может быть депонент в Payment, при условии что он есть

            res.json([session.rows[0], client.rows[0]])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async getAllSessions(req, res) {
        try {
            const sessions = await pool.query(`SELECT * FROM sessions`)
            res.json(sessions.rows)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}