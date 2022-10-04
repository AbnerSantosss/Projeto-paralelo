const express = require('express') //Importando o express

const AuthController = require('./Controllers/AuthController')

const app = express() //executando o expresCLEAR

app.use(express.json()) // aqui estou dizendo que vou poder enviar e receber json

app.use('/auth', AuthController)

app.listen(3001, () => {
  console.log('Servidor express Iniciado!')
})
