import { pool } from '../db.js'

export class sessionVisitorsStartEndTimeController {
    async setStartTime(req, res) {
        try {
            const { visitorsId, sessionId, startTime } = req.body
            // У каждого Deponent где client id IN clientsId добавить value к значению value в депозите
            for (let i = 0; i < visitorsId.length; i++) {
                const visitorId = visitorsId[i];
                const visitorDeponent = await pool.query(`SELECT deponent_value FROM deponents WHERE visitor_id = ${visitorId}`)
                const visitorDeposit = await pool.query(`SELECT deposit_value FROM deposits WHERE visitor_id = ${visitorId}`)
                if (visitorDeponent.rows[0]) {
                    const newDeposit = ((visitorDeposit.rows[0]) ? visitorDeposit.rows[0].deposit_value : 0) + visitorDeponent.rows[0].deponent_value
                    console.log('depositVisit:', ((visitorDeposit.rows[0]) ? visitorDeposit.rows[0].deposit_value : 0), '+', 'deponentVisit:', visitorDeponent.rows[0].deponent_value, '=', 'newDeposit', newDeposit);
                    await pool.query(`UPDATE deposits SET deposit_value = '${newDeposit}' WHERE visitor_id = $1`, [visitorId])
                    await pool.query(`UPDATE deponents SET status = 'disactive' WHERE visitor_id = $1`, [visitorId])
                }
            }
            await pool.query(`UPDATE visitors SET start_time_visitor = '${startTime}', status = 'active' WHERE id IN (${visitorsId})`) // ready
            const sessionStartTime = await pool.query(`SELECT start_time_visitor FROM visitors WHERE session_id = ${sessionId} ORDER BY start_time_visitor ASC LIMIT 1`) // ready
            const session = await pool.query(`UPDATE sessions SET start_time_session = '${new Date(sessionStartTime.rows[0].start_time_visitor).toISOString()}', status = 'active' WHERE id = $1 RETURNING *`, [sessionId]) // ready
            res.json(session.rows)
            // res.json('ALL GOOD')
        } catch (e) {
            res.json('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack)
        }
    }


    async setEndTime(req, res) {
        try {
            const { visitorsId, sessionId, endTime } = req.body

            await pool.query(`UPDATE visitors SET end_time_visitor = '${endTime}', status = 'close' WHERE id IN (${visitorsId})`)
            const visitors = await pool.query(`SELECT end_time_visitor FROM visitors WHERE session_id = ${sessionId}`)
            let sessionEndIdentifier = true
            for (let i = 0; i < visitors.rows.length; i++) {
                if (!visitors.rows[i].end_time_visitor) {
                    sessionEndIdentifier = false
                }
            }
            if (sessionEndIdentifier) {
                const sessionEndTime = await pool.query(`SELECT end_time_visitor FROM visitors WHERE session_id = ${sessionId} ORDER BY end_time_visitor DESC LIMIT 1`);
                const session = await pool.query(`UPDATE sessions SET end_time_session = '${new Date(sessionEndTime.rows[0].end_time_visitor).toISOString()}', status = 'close' WHERE id = $1`, [sessionId])
            }

            res.json({ massage: 'Изменения внесены' })
        } catch (e) {
            res.json('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack)
        }
    }
}