import { pool } from '../db.js'

export class roomsController {
    async getRooms(req, res) {
        try {
            const rooms = await pool.query(`SELECT * FROM rooms`)
            res.json(rooms.rows)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async createRoom(req, res) {
        try {
            const { name } = req.body
            const room = await pool.query(`INSERT INTO rooms ( name ) values ( $1 ) RETURNING *`, [name])
            res.json(room.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async deleteRoom(req, res) {
        try {
            const roomID = req.params.id
            const room = await pool.query(`DELETE FROM rooms where id = $1`, [roomID])
            res.json(room.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}