import * as dotenv from 'dotenv'
import express from "express";
import cors from "cors"
import * as visitorsRoutes from './routes/visitorsRoutes.js'
import * as visitorsServicesRoutes from './routes/visitorsServicesRoutes.js'
import * as paymentTypesRoutes from './routes/paymentTypesRoutes.js'
import * as paymentsRoutes from './routes/paymentsRoutes.js'
import * as usersRoutes from './routes/usersRoutes.js'
import * as visitorsTimelinesRoutes from './routes/visitorsTimelinesRoutes.js'
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

const visitorsR = visitorsRoutes.router
const visitorsServicesR = visitorsServicesRoutes.router
const paymentTypesR = paymentTypesRoutes.router
const paymentsR = paymentsRoutes.router
const usersR = usersRoutes.router
const visitorsTimelinesR = visitorsTimelinesRoutes.router
const roomsR = roomsRoutes.router
const servicesR = servicesRoutes.router
const sessionsR = sessionsRoutes.router
const tariffsR = tariffsRoutes.router


app.use('/api', visitorsR)
app.use('/api', visitorsServicesR)
app.use('/api', paymentTypesR)
app.use('/api', paymentsR)
app.use('/api', usersR)
app.use('/api', visitorsTimelinesR)
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