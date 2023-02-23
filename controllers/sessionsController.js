import { pool } from '../db.js'

export class sessionsController {
    async createSession(req, res) {
        try {

            const { room_id, booked_date, estimate_session_duration, estimate_visitors_num, start_time_session, end_time_session, status } = req.body
            const session = await pool.query(`INSERT INTO sessions (room_id, booked_date, estimate_session_duration, estimate_visitors_num, start_time_session, end_time_session, status) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [room_id, booked_date, estimate_session_duration, estimate_visitors_num, start_time_session, end_time_session, status])

            // if(req.body.visitors){
            //     for (let i = 0; i < visitors.length; i++) {
            //         const element = array[i];

            //     }
            //     const visitors_sessions_durations
            // }

            // for (let i = 0; i < req.body.visitors.length; i++) {
            //     const { tariff_id, name, lastname, number_phone, deposit, deponent, status } = req.body.visitors[i]
            //     await pool.query(`INSERT INTO visitors (session_id, tariff_id, name, lastname, number_phone, deposit, deponent, status) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [session.rows[0].id, tariff_id, name, lastname, number_phone, deposit, deponent, status])
            // }

            res.json([session.rows[0]])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async getSession(req, res) {
        try {
            const session_id = req.params.id
            let session = await pool.query(`SELECT * FROM sessions where id = $1`, [session_id])
            res.json(session.rows)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async getAllSessions(req, res) {
        try {
            let sessions = await pool.query(`SELECT * FROM sessions`)
            // for (let i = 0; i < sessions.rows.length; i++) {
            // брать пользователей по visitors_sessions_durations
            //     const visitors = await pool.query(`SELECT * FROM visitors where session_id = $1`, [sessions.rows[i].id])
            //     sessions.rows[i].visitors = visitors.rows
            // }
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
                // const timeBooking = Number(sessions.rows[i].time_booking.slice(0, 2)) * 60 + Number(sessions.rows[i].time_booking.slice(-2))
                const timeBooking = new Date(sessions.rows[i].date).getHours() * 60 + new Date(sessions.rows[i].date).getMinutes()
                sessions.rows[i].time_booking = timeBooking
                sessions.rows[i].visitors = visitors.rows
            }
            for (let i = -2; i < days - 2; i++) {
                let date = new Date()
                date.setUTCHours(0, 0, 0, 0)
                date = date.setDate(date.getDate() + i)
                for (let j = 0; j < sessions.rows.length; j++) {
                    const session = sessions.rows[j];
                    if (new Date(session.date).toLocaleDateString() === new Date(date).toLocaleDateString()) {
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
            const visitors = await pool.query(`DELETE FROM visitors where session_id = $1`, [sessionId]);
            const session = await pool.query(`DELETE FROM sessions where id = $1`, [sessionId]);
            res.json(session.rows[0]).status(200)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}