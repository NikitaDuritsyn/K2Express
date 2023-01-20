import * as dotenv from 'dotenv'
import express from "express";
import cors from "cors"
import * as clientRouter from './routes/clientRoutes.js'
const clientR = clientRouter.router

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/api', clientR)



const start = async () => {
    try{
        app.listen(PORT, () => console.log(`server started on port http://localhost:${PORT}`))
    }catch(e){
        console.log(e);
    }
}
start()