import express from 'express'
const userRoutes = require('./routes/user')
const commentRoutes = require('./routes/comment')

const app = express()
const port = 3001

app.use(express.json())
app.use(userRoutes)
app.use(commentRoutes)

app.listen(port, () => {
  console.log(`Servidor ativo na porta ${port}`)
})