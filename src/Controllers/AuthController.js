const express = require('express')

const User = require('../models/User')

const UserModel = require('../models/User')

const router = express.Router()

//Cadastrar o Usuário
router.post('/register', async (req, res) => {
  const { email } = req.body //Aqui estou pegando oq chega da requisição, desestruturando e pegando só o email.

  if (await UserModel.findOne({ email })) {
    // esse if é para validar se já existe um email parecido com oq o usuario colocou
    //Aquin estou usando o FindOne para filtrar o email
    return res.status(400).json({
      // tem que colocar o return se não ele vai dar erro
      error: true,
      message: 'Email já cadastrado!'
    })
  }

  const User = await UserModel.create(req.body) // Aqui é um ponto chave, estamos criando o registro no banco de dados, estamos pegando oq vem do corpo da requisição e usando o formato  que predefinimos na nossa model

  //User.password = undefined // Aqui é para não retornar pela API a senha do usuario, está com comentario pois quero mostrar a  senha no retorno, de qualquer forma criptografei a senha com o bcrypt, quem estiver no banco de dados só vai conseguir ver a senha criptografada!

  console.log(req.body)
  return res.status(200).json({
    erro: false,
    message: `Usuario ${User.name} criado com sucesso!`,
    data: User
  })
})

//Leitura de dados
router.get('/usuario', async (req, res) => {
  console.log(res.json)
  try {
    const user = await User.find()

    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ error })
  }
})

//Leitura especifica de Expecifica de dados
router.get('/usuario/:id', async (req, res) => {
  const id = req.params.id // Aqui estou extraindo o dado da requisição!  Quando vem pela URL o dado vem no params url = req.params. Na url ('/:id') tudo que vier depois do : vai ser entendido como parametro(id) (pode ser qualquer nome, mas tem que ser algo que possa ser encontrado, que exista)

  try {
    const user = await User.findOne({ _id: id })
    // findOne é usado para encontrar apenas um resultado. Aqui ({_id: id})  tenho que colocar o _id pois é assimm que está lá no mongodb, no caso, na minha requisição vai chegar assim, e aqui tem que estar igual, que a aplicação vai entender que recebeu oq espera, o outro id é realmente o id que vem de lá tb.
    //no segundo parametro Estou dizendo que quero encontarr o usuario id igual ao id que venha da minha requisição

    if (!user) {
      res.status(422).json({ message: 'Usuario não foi encontrado' })
      return
    }

    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//Atualização dados - Vamos usar o patch pois com ele podemos fazer atualizações parciais
router.patch('/usuario/:id', async (req, res) => {
  const id = req.params.id

  try {
    const updatePerson = await User.updateOne({ _id: id }, req.body)

    if (updatePerson.matchedCount === 0) {
      res.status(422).json({ message: 'Usuario não foi encontrado' })
      cosole.log('Não pegou')
      return
    }
    res.status(200).json({ message: 'Atualizado comm sucesso' })
    console.log('atualizado')
  } catch (error) {
    res.status(500).json({ error: 'Error ao atualizar os dados' })
  }
})

//Deletar
router.delete('/usuario/:id', async (req, res) => {
  const id = req.params.id
  const person = await User.findOne({ _id: id })

  if (!person) {
    //Aqui estou devolvendo um erro caso o usuario não exista
    res.status(422).json({ message: 'Usuario não foi encontrado' })
    return
  }

  try {
    await UserModel.deleteOne({ _id: id })
    res
      .status(200)
      .json({ message: `Usuário ${person.name} Romovido com sucesso!` })
  } catch (error) {
    res.status(500).json({ error: error })
    console.log(error)
  }
})

module.exports = router
