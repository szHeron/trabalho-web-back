import express from 'express'
const userRoutes = require('./routes/user')
const database = require('./config/db')

const app = express()
const port = 3001

app.use(express.json())
app.use(userRoutes)

app.listen(port, () => {
  console.log(`Servidor ativo na porta ${port}`)
})