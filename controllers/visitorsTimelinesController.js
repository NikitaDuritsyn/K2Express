import { pool } from '../db.js'

export class visitorsTimelinesController {
    async createVisitorTimeline(req, res) {
        try {
            const { session_id, visitor_id, time_line, start_time, end_time } = req.body
            const visitorTimeline = await pool.query(`INSERT INTO visitors_timelines ( session_id, visitor_id, time_line, start_time, end_time ) values ( $1, $2, $3, $4, $5 ) RETURNING *`, [session_id, visitor_id, time_line, start_time, end_time])
            res.json(visitorTimeline.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}