import express from 'express'
const cors = require('cors')
const userRoutes = require('./routes/user')
const commentRoutes = require('./routes/comment')
const db = require('./config/db')

const app = express()
const port = 3001

app.use(express.json())
app.use(cors({
  origin: '*'
}));
app.use(userRoutes)
app.use(commentRoutes)

app.listen(port, () => {
  console.log(`Servidor ativo na porta ${port}`)
})