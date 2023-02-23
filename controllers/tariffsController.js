import { pool } from '../db.js'

export class tariffsController {
    async createTariff(req, res) {
        try {
            const { title } = req.body
            const tariff = await pool.query(`INSERT INTO tariffs ( title ) values ( $1 ) RETURNING *`, [title])
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
    async deleteTariff(req, res) {
        try {
            const tariffId = req.params.id
            const tariff = await pool.query(`DELETE FROM tariffs where id = $1`, [tariffId])
            res.json(tariff.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}