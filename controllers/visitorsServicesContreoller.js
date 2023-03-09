import { pool } from '../db.js'

export class visitorsServicesContreoller {
    async createVisitorService(req, res) {
        try {
            const { visitor_id, service_id } = req.body
            const visitor_service = await pool.query(`INSERT INTO visitors_services ( visitor_id, service_id ) values ( $1, $2 ) RETURNING *`, [visitor_id, service_id])
            res.json(visitor_service.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async getAllVisitorsServices(req, res) {
        try {
            const visitorsServices = await pool.query(`SELECT * FROM visitors_services`)
            res.json(visitorsServices.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async getVisitorServices(req, res) {
        try {
            const visitorId = req.params.id
            // получаем все записи сервисов посетителя
            const visitorServices = await pool.query(`SELECT * FROM visitors_services where visitor_id = $1`, [visitorId])

            const visitorServicesList = []
            for (let i = 0; i < visitorServices.rows.length; i++) {
                const service = await pool.query(`SELECT * FROM services where id = $1`, [visitorServices.rows[i].service_id])
                visitorServicesList.push(service.rows[0])
            }

            res.json(visitorServicesList)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async getVisitorsServices(req, res) {
        try {
            const { visitorsId } = req.body
            const visitorsServices = await pool.query(`SELECT * FROM visitors_services where visitor_id IN (${visitorsId.join(',')})`)
            const visitorsServicesList = []
            for (let i = 0; i < visitorsServices.rows.length; i++) {
                const service = await pool.query(`SELECT * FROM services where id = $1`, [visitorsServices.rows[i].service_id])
                visitorsServicesList.push(service.rows[0])
            }
            res.json(visitorsServicesList)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}