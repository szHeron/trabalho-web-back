const express = require('express')

const app = express()
const port = 3001

app.use(express.json())

app.listen(() => {
  console.log(`Servidor ativo na porta ${port}`)
})