import { pool } from '../db.js'

export class sessionsController {
    async createSession(req, res) {
        try {

            const { room_id, date, time_booking, timeLine, start_time, end_time, status } = req.body[0]
            const session = await pool.query(`INSERT INTO sessions (room_id, date, time_booking, timeLine, start_time, end_time, status) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [room_id, date, time_booking, timeLine, start_time, end_time, status])

            const { name, last_name, number_phone, deposit, deponent, tariff_id, status_visitor } = req.body[1]
            const visitor = await pool.query(`INSERT INTO visitors (session_id, name, lastname, number_phone, deposit, deponent, tariff_id, status) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [session.rows[0].id, name, last_name, number_phone, deposit, deponent, tariff_id, status_visitor])

            // НУЖНО УТОЧНИТЬ МОМЕНТ КСТАТИ МОЖЕТ ЛИ ВООБЩЕ ТАКОЕ БЫТЬ ЧТО ДЕПОНЕНТ НЕ ВНЕСЛИ ПРИ БРОНИ
            // Тут еще может быть депонент в Payment, при условии что он есть

            res.json([session.rows[0], visitor.rows[0]])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }

    async getAllSessions(req, res) {
        try {
            let sessions = await pool.query(`SELECT * FROM sessions`)
            for (let i = 0; i < sessions.rows.length; i++) {
                const visitors = await pool.query(`SELECT * FROM visitors where session_id = $1`, [sessions.rows[i].id])
                sessions.rows[i].visitors = visitors.rows
            }
            res.json(sessions.rows)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }

    async getAllSessionsByDaysForChart(req, res) {
        try {
            const days = req.params.days || 10
            let lastDate = new Date();
            let futureDate = new Date();
            lastDate.setUTCHours(0, 0, 0, 0)
            futureDate.setUTCHours(0, 0, 0, 0)
            lastDate = lastDate.setDate(lastDate.getDate() - 2)
            futureDate = futureDate.setDate(futureDate.getDate() + Number(days) - 2)

            let sessions = await pool.query(`SELECT * FROM sessions WHERE date BETWEEN '${new Date(lastDate).toISOString().split('T')[0]}' AND '${new Date(futureDate).toISOString().split('T')[0]}'`)

            for (let i = 0; i < sessions.rows.length; i++) {
                const visitors = await pool.query(`SELECT * FROM visitors where session_id = $1`, [sessions.rows[i].id])
                const timeBooking = Number(sessions.rows[i].time_booking.slice(0, 2)) * 60 + Number(sessions.rows[i].time_booking.slice(-2))
                sessions.rows[i].time_booking = timeBooking
                sessions.rows[i].visitors = visitors.rows
            }

            let date_array = []
            let today = new Date()
            for (let i = -2; i < days - 2; i++) {
                let date = new Date()
                date.setUTCHours(0, 0, 0, 0)
                date = date.setDate(date.getDate() + i)

                date_array.push(date)
                for (let j = 0; j < sessions.rows.length; j++) {
                    const session = sessions.rows[j];
                    if (new Date(session.date).toISOString().split('T')[0] === new Date(date).toISOString().split('T')[0]) {
                        session.index_day = i + 2
                    }
                }
            }


            res.json(sessions.rows)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async deleteSession(req, res) {
        try {
            const sessionId = req.params.id
            const session = await pool.query(`DELETE FROM sessions where id = $1`, [sessionId])
            res.json(session.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}