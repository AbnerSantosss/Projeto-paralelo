const mongoose = require('mongoose')

const DB_NAME = 'abnersenna'
const DB_PASSWORD = 'campinhodigital'

mongoose.connect(
  `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@clustercampinho.93usllb.mongodb.net/Banco-de-dados-API?retryWrites=true&w=majority`,
  {},
  error => {
    if (error) {
      console.log('falha ao autenticar co o mongo Db')
      console.log(error)
      return
    }
    console.log('Conectamos ao mongoDb')
  }
)

mongoose.Promise = global.Promise

module.exports = mongoose
