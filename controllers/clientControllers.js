import { pool } from '../db.js'

export class clientController {
    async createClient(req, res) {
        try {
            const tasks = await pool.query(`SELECT * FROM clients`)
            res.json(tasks.rows)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}
