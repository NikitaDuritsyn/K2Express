import { pool } from '../db.js'

export class roomsController {
    async createRoom(req, res) {
        try {
            const { name } = req.body
            const room = await pool.query(`INSERT INTO rooms ( name ) values ( $1 ) RETURNING *`, [name])
            res.json(room.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}