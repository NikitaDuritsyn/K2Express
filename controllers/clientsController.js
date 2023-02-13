import { pool } from '../db.js'

export class clientController {
    async createClient(req, res) {
        try {
            // НУЖНО УТОЧНИТЬ МОМЕНТ КСТАТИ МОЖЕТ ЛИ ВООБЩЕ ТАКОЕ БЫТЬ ЧТО ДЕПОНЕНТ НЕ ВНЕСЛИ ПРИ БРОНИ
            // Тут еще может быть депонент в Payment, при условии что он есть
            const sessionId = req.params.id
            const { name, last_name, number_phone, status } = req.body
            const client = await pool.query(`INSERT INTO clients (session_id, name, lastname, number_phone, status) values ($1, $2, $3, $4, $5) RETURNING *`, [sessionId, name, last_name, number_phone, status])
            res.json(client.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async getAllClients(req, res) {
        try {
            const clients = await pool.query(`SELECT * FROM clients`)
            res.json(clients.rows)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async getAllClientsBySessionId(req, res) {
        try {
            const sessionId = req.params.id
            const clients = await pool.query(`SELECT * FROM clients where session_id = $1`, [sessionId])
            res.json(clients.rows)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}
