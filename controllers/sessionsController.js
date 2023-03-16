import { pool } from '../db.js'

export class sessionsController {
    async createSession(req, res) {
        try {
            //Получаем данные сесии из запроса
            const { booked_date, estimate_session_duration, estimate_visitors_num, tariff_id } = req.body
            // Создаем сессию
            const session = await pool.query(`INSERT INTO sessions (booked_date, estimate_session_duration, estimate_visitors_num, status, tariff_id) values ($1, $2, $3, $4, $5) RETURNING *`, [booked_date, estimate_session_duration, estimate_visitors_num, 'booked', tariff_id])
            //Получаем данные визитеров сессии и добавляем в бд
            for (let i = 0; i < req.body.visitors.length; i++) {
                // Получаем данные визитера из запроса
                const { name, last_name, number_phone, deposit, deponent } = req.body.visitors[i]
                //Запрос на добавление визитера к сесси по id сессии
                const visitor = await pool.query(`INSERT INTO visitors (session_id, tariff_id, name, status) values ($1, $2, $3, $4) RETURNING *`, [session.rows[0].id, tariff_id, name, 'booked'])
                if (number_phone) {
                    // Ищем клиента по номеру 
                    const clientFound = await pool.query(`SELECT * FROM clients where number_phone = $1`, [number_phone])
                    if (clientFound.rows[0]) {
                        // Если клиент НАЙДЕН по номеру, то добавляем данному визитеру id клиента в поле client_id
                        const visitors_updated = await pool.query(`UPDATE visitors SET client_id = ${clientFound.rows[0].id} WHERE id = ${visitor.rows[0].id} RETURNING *`)
                        if (deposit?.value) {
                            // Если внесен депозит, то создаем депозит и вяжем к клиенту
                            setDeposit(clientFound.rows[0], visitors_updated.rows[0], deposit)
                        }
                        if (deponent?.value) {
                            //Eсли внесен депонент, то создаем депонент и вяжем к клиенту
                            setDeponent(clientFound.rows[0], visitors_updated.rows[0], deponent)
                        }
                    } else {
                        // Если клиент НЕ найден по номеру, то создаем Client
                        const client = await pool.query(`INSERT INTO clients (name, lastname, number_phone) values ($1, $2, $3) RETURNING *`, [name, last_name, number_phone])
                        // Далее добавляем данному визитеру id данного клиента в поле client_id
                        const visitors_updated = await pool.query(`UPDATE visitors SET client_id = ${client.rows[0].id} WHERE id = ${visitor.rows[0].id} RETURNING *`)
                        if (deposit?.value) {
                            // Если внесен депозит, то создаем депозит и вяжем к клиенту
                            setDeposit(client.rows[0], visitors_updated.rows[0], deposit)
                        }
                        if (deponent?.value) {
                            //Eсли внесен депонент, то создаем депонент и вяжем к клиенту
                            setDeponent(client.rows[0], visitors_updated.rows[0], deponent)
                        }
                    }
                } else {
                    console.log("Номер телефона не введен");
                }
            }
            for (let i = 0; i < req.body.rooms.length; i++) {
                // Вносим в бд комнаты сессии по id сессиии
                await pool.query(`INSERT INTO sessions_rooms ( room_id, session_id ) values ($1, $2) RETURNING *`, [req.body.rooms[i], session.rows[0].id])
            }
            async function setDeposit(client, visitor, deposit) {
                // Создаем депозит по клиенту
                const insert_deposit = await pool.query(`INSERT INTO deposits (visitor_id, paymet_type_id, client_id, deposit_value) values ($1, $2, $3, $4) RETURNING *`, [visitor.id, deposit.paymet_type_id, client.id, deposit.value])
                return insert_deposit.rows[0]
            }
            async function setDeponent(client, visitor, deponent) {
                // Создаем депонент по клиенту
                const insert_deponent = await pool.query(`INSERT INTO deponents (visitor_id, client_id, deponent_value, status) values ($1, $2, $3, $4) RETURNING *`, [visitor.id, client.id, deponent.value, 'active'])
                return insert_deponent.rows[0]
            }
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
            // Находим сессии в данном деапозоне дат
            let sessions = await pool.query(`SELECT * FROM sessions WHERE booked_date BETWEEN '${new Date(lastDate).toISOString().split('T')[0]}' AND '${new Date(futureDate).toISOString().split('T')[0]}'`)
            for (let i = 0; i < sessions.rows.length; i++) {
                // Ищем пользователей по id сессии
                const visitors = await pool.query(`SELECT * FROM visitors where session_id = $1`, [sessions.rows[i].id])
                const session_rooms = await pool.query(`SELECT * FROM sessions_rooms where session_id = $1`, [sessions.rows[i].id])
                // const timeBooking = Number(sessions.rows[i].time_booking.slice(0, 2)) * 60 + Number(sessions.rows[i].time_booking.slice(-2))
                const timeBooking = new Date(sessions.rows[i].date).getHours() * 60 + new Date(sessions.rows[i].date).getMinutes()
                sessions.rows[i].time_booking = timeBooking
                sessions.rows[i].visitors = visitors.rows
                sessions.rows[i].session_rooms = session_rooms.rows
            }
            // Добавляем поле index_day в соответствии с датой бронирования
            for (let i = -2; i < days - 2; i++) {
                let date = new Date()
                date.setUTCHours(0, 0, 0, 0)
                date = date.setDate(date.getDate() + i)
                for (let j = 0; j < sessions.rows.length; j++) {
                    const session = sessions.rows[j];
                    if (new Date(session.booked_date).toLocaleDateString() === new Date(date).toLocaleDateString()) {
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
            await pool.query(`DELETE FROM visitors_services WHERE visitor_id IN (SELECT id FROM visitors where session_id = ${sessionId});`)
            await pool.query(`DELETE FROM deposits WHERE visitor_id IN (SELECT id FROM visitors where session_id = ${sessionId});`)
            await pool.query(`DELETE FROM deponents WHERE visitor_id IN (SELECT id FROM visitors where session_id = ${sessionId});`)
            await pool.query(`DELETE FROM visitors where session_id = $1`, [sessionId]);
            await pool.query(`DELETE FROM sessions_rooms where session_id = $1`, [sessionId]);
            const session = await pool.query(`DELETE FROM sessions where id = $1 RETURNING *`, [sessionId]);
            res.json(session.rows[0])

        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
    async updateSession(req, res) {
        try {
            const sessionId = req.params.id
            const updateData = req.body.updateData
            for (const key in updateData) {
                if (updateData.hasOwnProperty.call(updateData, key)) {
                    const value = updateData[key];
                    if (value && key != 'id') {
                        await pool.query(`UPDATE session SET ${key} = '${value}' WHERE id = ${sessionId}`)
                    }
                }
            }
            res.json()
        } catch (e) {
            console.log('Ошибка ' + e.name + ":\n " + e.message + "\n\n" + e.stack);
        }
    }
}