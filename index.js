import * as dotenv from 'dotenv'
import express from "express";
import cors from "cors"
import * as clientsRoutes from './routes/clientsRoutes.js'
import * as clientsServicesRoutes from './routes/clientsServicesRoutes.js'
import * as roomsRoutes from './routes/roomsRoutes.js'
import * as servicesRoutes from './routes/servicesRoutes.js'
import * as sessionsRoutes from './routes/sessionsRoutes.js'
import * as tariffsRoutes from './routes/tariffsRoutes.js'


dotenv.config()
const PORT = process.env.PORT || 3000
const HOST_NAME = process.env.HOST_NAME
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const clientR = clientsRoutes.router
const clientServicesR = clientsServicesRoutes.router
const roomsR = roomsRoutes.router
const servicesR = servicesRoutes.router
const sessionsR = sessionsRoutes.router
const tariffsR = tariffsRoutes.router

app.use('/api', clientR)
app.use('/api', clientServicesR)
app.use('/api', roomsR)
app.use('/api', servicesR)
app.use('/api', sessionsR)
app.use('/api', tariffsR)


const start = async () => {
    try {
        app.listen(PORT, HOST_NAME, () => console.log(`server started on port http://${HOST_NAME}:${PORT}`))
    } catch (e) {
        console.log(e);
    }
}
start()