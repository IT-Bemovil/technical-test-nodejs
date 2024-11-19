import express from 'express';
import { getRoutes } from './routes/routes.js';
import cors from 'cors';
import { sequelizeConnection } from './database/index.js';

process.loadEnvFile()
const PORT = process.env.PORT || 3011
const app =  express()


app.disable('x-powered-by')
app.use(express.json())
app.use(cors())

sequelizeConnection.sync().then(()=>{
  console.log('Database synced')
})

getRoutes(app)


app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
})