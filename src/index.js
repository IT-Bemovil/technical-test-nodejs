import express from 'express';
import initDataBase from './configDB/connection.js';
import User from '../src/users/models/user.js'

const app = express()
app.use(express.json())
initDataBase()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.status(200).send({ message: 'inicio' })
})

app.listen(port, () => {
  console.log(`server running in http://localhost:${port}`);
})