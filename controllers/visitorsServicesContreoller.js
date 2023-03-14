import { pool } from '../db.js'
export class visitorsServicesContreoller {
    // INSERT VISITORS_SERVICES (many_to_many) BY VISITOR_ID, SERVICE_ID
    async createVisitorService(req, res) {
        try {
            const { visitor_id, service_id } = req.body
            const visitor_service = await pool.query(`INSERT INTO visitors_services ( visitor_id, service_id ) values ( $1, $2 ) RETURNING *`, [visitor_id, service_id])
            res.json(visitor_service.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    // SELECT ALL
    async getAllVisitorsServices(req, res) {
        try {
            const visitorsServices = await pool.query(`SELECT * FROM visitors_services`)
            res.json(visitorsServices.rows[0])
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    // SELECT ALL BY ONE VISITOR_ID ???
    async getVisitorServices(req, res) {
        try {
            const visitorId = req.params.id
            const visitorServices = await pool
                .query(`SELECT visitors_services.id, services.title, services.price, visitors.name 
                        FROM visitors_services 
                        JOIN services ON visitors_services.service_id=services.id 
                        JOIN visitors ON visitors_services.visitor_id=visitors.id 
                        WHERE visitors_services.visitor_id = $1`, [visitorId])
            res.json(visitorServices.rows)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    // SELECT ALL BY VISITORS_ID:ARRAY
    async getVisitorsServices(req, res) {
        try {
            const visitorsServices = await pool
                .query(`SELECT visitors_services.id, services.title, services.price, visitors.name 
                        FROM visitors_services 
                        JOIN services ON visitors_services.service_id=services.id 
                        JOIN visitors ON visitors_services.visitor_id=visitors.id 
                        WHERE visitors_services.visitor_id IN (${req.body})`)

            res.json(visitorsServices.rows)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async deleteVisitorService(req, res) {
        try {
            const visitorServiceId = req.params.id
            const visitorService = await pool.query(`DELETE FROM visitors_services WHERE id = $1`, [visitorServiceId])
            res.json(visitorService.rows)
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}