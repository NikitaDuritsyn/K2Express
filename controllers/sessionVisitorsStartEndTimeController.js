import { pool } from '../db.js'

export class sessionVisitorsStartEndTimeController {
    async setStartTime(req, res) {
        try {
            const { visitorsId, sessionId, startTime } = req.body

            await pool.query(`UPDATE visitors SET start_time_visitor = '${startTime}', status = 'active' WHERE id IN (${visitorsId})`)
            const sessionStartTime = await pool.query(`SELECT start_time_visitor FROM visitors WHERE session_id = ${sessionId} ORDER BY start_time_visitor ASC LIMIT 1`)
            const session = await pool.query(`UPDATE sessions SET start_time_session = '${new Date(sessionStartTime.rows[0].start_time_visitor).toISOString()}', status = 'active' WHERE id = $1 RETURNING *`, [sessionId])
            res.json(session.rows)
        } catch (e) {
            res.json('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack)
        }
    }


    async setEndTime(req, res) {
        try {
            const { visitorsId, sessionId, endTime } = req.body
            console.log(visitorsId, sessionId, endTime);



            res.json(req.body)
        } catch (e) {
            res.json('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack)
        }
    }
}