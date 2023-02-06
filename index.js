import * as dotenv from 'dotenv'
import express from "express";
import cors from "cors"
import * as clientRouter from './routes/clientRoutes.js'
import * as bookingRouter from './routes/bookingRouter.js'


dotenv.config()
const PORT = process.env.PORT || 3000
const HOST_NAME = process.env.HOST_NAME
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const clientR = clientRouter.router
const bookingR = bookingRouter.router

app.use('/api', clientR)
app.use('/api', bookingR)


const start = async () => {
    try {
        app.listen(PORT, HOST_NAME, () => console.log(`server started on port http://${HOST_NAME}:${PORT}`))
    } catch (e) {
        console.log(e);
    }
}
start()