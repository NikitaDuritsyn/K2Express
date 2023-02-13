import { pool } from '../db.js'

export class tariffsController {
    async createTariff(req, res) {
        try {
            const { name } = req.body
            const tariff = await pool.query(`INSERT INTO tariffs ( name ) values ( $1 ) RETURNING *`, [name])
            res.json(tariff.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async getAllTariffs(req, res) {
        try {
            const tariffs = await pool.query(`SELECT * FROM tariffs`)
            res.json(tariffs.rows)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}