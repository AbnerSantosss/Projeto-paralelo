const mongoose = require('../database')

const bcryptjs = require('bcryptjs')

const UseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true, //Aqui estou dizendo que esse campo é obrigatório
    unique: true, //aqui estou dizendo que esse email tem que ser unico no meu banco/coleção ele é um dado que não pode se repetir
    lowercase: true // mesmo se o usuario digitar alguma letra maiuscula eu estou convertendo tudo para minuscula
  },
  password: {
    type: String,
    required: true,
    select: false //aqui estou dizendo que quando eu fizer uma consulta no mongdb, não quero que mostre o password!
  },
  createdAt: {
    //Aqui é para armazenar quando registro foi criado
    type: Date, //tipo data
    default: Date.now // Equi estou dizendo que a data atual sempre vai ser a data padrão, meio que estou fazendo isso de forma automática
  }
})

UseSchema.pre('save', async function (next) {
  // Aqui estou falando: sempre com o UseSchema, antes de um registro ser criado (pre(save)) eu quero que ele execute uma função assincrona que pega a senha limpa faz a incroptografia e depois salva no banco de dados
  //Temos que usar uma função acincrona pq não sabemos quanto tempo vai levar a criptografia, pq para fazer isso o bscript da varios "saltos" para gerar a criptografia.
  const hash = await bcryptjs.hash(this.password, 10) //O bcrypt tem um método chamado hash, ele é quem embaralha a senha, no primeiro parametro temos que referenciar onde estar o campo de senha -> this.password é igual a UseSchema.password, no segundo parametro colocamos q auantidade de vezes que queremos que ele faça a operação de embaralhamento
  console.log(hash)
  console.log(this)
  this.password = hash
})

const User = mongoose.model('User', UseSchema) //aqui é uma model baseado nas validações, no primeiro parametro é o nome da model e o segundo é os parametros(regras que ele vai seguir)

module.exports = User
