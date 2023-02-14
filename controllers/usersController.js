import { pool } from '../db.js'

export class usersController {
    async createUser(req, res) {
        try {
            const { name, lastname, email, password, phone, token, status } = req.body
            const room = await pool.query(`INSERT INTO rooms ( name, lastname, email, password, phone, token, status ) values ( $1, $2, $3, $4, $5, $6, $7 ) RETURNING *`, [name, lastname, email, password, phone, token, status])
            res.json(room.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}