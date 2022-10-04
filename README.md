<div align="center">
 
  <img src="https://plataforma.campinhodigital.org/user/assets/images/logo-campinho.png" alt="">
  <h1>Projeto Integrador</h1>
 <p>Esse repositorio é destinado ao protótipo que eu fiz, e a baixo tem uma documentação que criei da API do trabalho, para um entendimendo mais claro de cada etapa do processo!</P>
 </div>

 
 



## 1- Instalar o node 
~~~~
- npm init -y
~~~~
## 2- instalar o express mongoose e nodemon

~~~~
- npm install nodemon mongoose express
~~~~

ATENÇÃO: Temos que ativar um recurso do express dizendo que a gente pode receber e interpretar dados 

via json

~~~~
- app.use(express.json()) 
~~~~

## 3- criar uma pasta src e colocar o script principal dentro ex: server.js



## 4- criar o script para startar com o nodemon



## 5- iniciar o express:
~~~~
const express = require('express')

const app = express()
~~~~


## 6- Executa o servidor par teste
~~~~
app.listen(3000, () => {
  console.log('o servidor está funcionando')
})
~~~~


## 7- fazer uma rota teste, e testa no postman (Criar uma variavél no postman com o link da servidor)

ex:
~~~~
app.get('/', (req, res) => {
  return res.json({
    erro: false,
    message: 'Acesso bem sucedido'
  })
})
~~~~


## 8- Criar uma pasta dentro de src chamada database, e dentro dela um arquivo chamado index.js
nesse arquivo vai ter todas as nossa configurações do banco de dados mongodb


## 9- Criar uma conta no mongdb Atlas

## 10- Pegar login e senha

ligin: abnersenna
senha: xxxxxxxxxx


## 11- No arquivo index, importar o mongoose!




## 12- Vamos fazer a conexão com o mongodb, pegando o link que foi fornecido
vamos fazer assim: 

~~~~
const DB_NAME = 'abnersenna'
const DB_PASSWORD = 'xxxxxxxxx'

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
~~~~

## ATENÇÃO: Note que criamos duas variavels, adicionamos o login e senha do banco

- Depois usamos template strings para poder usar no link, isso por questão de segurança (lembrar do .env)

- No mongoose.connect temos 3 parametros, o primeiro é o link de acesso, o segundo um objeto e o terceiro o tratamento
de error, onde podemos ver se conseguimos conectar ou não, e também retornar o erro caso não tenha
conectado




## 13 - criar o arquivo que permite o mongo trabalhar com o node.js

~~~~
mongoose.Promise = global.Promisse
~~~~

## 14- exportar o objeto mongosse

~~~~
module.exports = mongoose
~~~~

## ATENÇÃO: Nesse ponto já concluimos a configuração com o nosso banco de dados!



## 15- Agora vamos criar uma model, model é básicamente um objeto que criamos
para salvar dados expecificos, por exemplo você quer salvar dados
de um usuario, que é nome, email e senha. Para isso criamos uma
model chamada user e sempre que estiver trabalhando com esse registro
vc vai estar usando essa model.

Vamos estar usando um padrão MVC, um design patterns ele é necessario
para ter uma um padrão no código mais organizado!

M - model faz comunicação com o banco de dados, registros.

V - É a parte do front-end, oq vai consumir esses dados

C - O controller, ele intercepta as rotas, trabalha com elas
fazendo todas as operações no banco de dados ultilizando a model
Ex: ele chama a model Cria um usuário no banco de dados e informa que 
o usuario foi criado com sucesso 



## 16- Na pasta src vamos criar outra pasta chamada models e dentro dela um arquivo chamado User.js
dentro desse arquivo vamos importar o mongoose que tem a configuração do nosso banco, pois
como falei o objetivo da model é fazer a comunicação com os registros do banco
então se quisermos mexer com o usuario é através da model!

## 17- para importar o mongoose dentro da model temos que importar como arquivo.
~~~~
Ex: const mongoose = require ('../database')
~~~~

## 18- Em seguida temos que criar nosso Schema (esquema)

- O Schema é basicamente algumas regras que vão ser aplicadas 
no documento ex:

se a gente vai criar um esquema de um usuario, nele vamos colocar oq esperamos
desse usuario, então sempre que um usuario novo dor criado ele vai seguir
os padrões pré definidos!

Estrutura: 

~~~~
const UserShcema = new mongoose.Schema({
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
  createdAt:{//Aqui é para armazenar quando registro foi criado
    type: Date, //tipo data
    default: Date.now // Equi estou dizendo que a data atual sempre vai ser a data padrão, meio que estou fazendo isso de forma automática

  }
})

~~~~

## 19- depois vamos ter que criar uma variavél para armazenar uma model:

ex: 
const User = mongoose.model('User' , UserShcema) //aqui é uma model baseado nas validações, no primeiro parametro é o nome da model e o segundo é os parametros(regras que ele vai seguir)


## 20- depois exportar essa model
~~~~
ex: module.exports = User
~~~~


## 21- Na pasta src agora vamos criar a pasta controller e dentro dela um arquivo chamado
AuthController.js 

-Lembrando: O controller ser resposavel por pegar a requisição, chamar a model
fazer oq tem q ser feito e retornar através da API se foi bem sucedido ou mal sucedido,
ele faz operações DIRETAMENTE  usando a model

- No arquivo Auth vamos importar o express e o Model que criamos
ex:
~~~~
const express = require('express')

const UserModel = require('../models/User')
~~~~

- Agora vamos criar rotas! usando o express temos que chamar a função para crialás dentro do express!
ex:
~~~~
const router = express.Router()
~~~~


## 22- Criar A primeira rota
~~~~
router.post('/register', (req, res) => {
  console.log(req.body)
  return req.jason({
    erro: false,
    message: 'registrado com sucesso'
  })
})
~~~~


## 23- Exportar essa rota
~~~~
module.exports = router
~~~~


## 24 - no server.js temos que criar uma rota que vai referenciar nosso AuthController

~~~~
app.use('/auth', AuthController)
~~~~



## 25- podemos testar no postamn agora uma rota, exemplo de rota para teste:
ex:
~~~~
router.post('/register', async (req, res) => {
  const User = await UserModel.create(req.body) 
  console.log(req.body)
  return res.json({
     erro: false,
     message: 'registrado com sucesso',
     data: User  //aqui vai retornar os dados tipo jason
  })
})

~~~~
// O codigo a cima é um ponto chave, estamos criando o registro no banco de dados, 
estamos pegando oq vem do corpo da requisição (oq é enviado do front-end)  
e usando o formato  que predefinimos na nossa model, depois usando a função de criar no banco as informações!
//O mongoose conecta no banco, cria um registro processa o registro e retorna pra gente se deu tudo certo, por isso usamos o ASYNC AWAIT



## 26 - Agora precisamos validar um campo para se certificar que não terá dois usuarios com emails iguais por exemplo



27 - No nossa pasta controller dentro da nossa    vamos fazer um 
~~~~

  if (await UserModel.findOne({ email })) { 
    
    return res.status(400).json({
      error: true,
      message: 'Email já cadastrado!'
    })
  }
~~~~

-Esse if é para validar se já existe um email parecido com oq o usuário colocou

-Aqui estou usando o FindOne para filtrar o email, o findOne é um método do mongoose que procura um registro
com o filtro que eu passar, no caso eu quero que ele busque um registro email, se ele encontrar ele vai retornar verdadeiro ou falso.




## 28 - Próximo passo é nós deixarmos a senha "indefinida" para quando ele retornar pela API não mostrar a senha do usuario


User.password = undefined // Aqui é para não retornar pela aqui a senha do usuario



## 29 - E também temos que criptografar a senha do usuario, para quem estiver acesso ao banco de dados não ter como 
ver a senha, para isso vamos usar um pacote chamado --> bcryptjs <---





## 30 - Depois que instalar o bcrypt vamos na nossa model, pq queremos que sempre que um novo
documento for criado, que temos certeza que a senha dele tenha sido criptografada

- Antes de tudo vamos importar o bcrypt no arquivo da model:
~~~~
const bcryptjs = require('bcryptjs')
~~~~

- Depois vamos usar o método .pre que vai realizar uma operação antes de salvar no banco, que no nosso
caso é criptografia da senha, segue a baixo o código

~~~~
UseSchema.pre('save', async function (next) {
  
  const hash = await bcryptjs.hash(this.password, 10) 
  console.log(hash) 
  console.log(this)
  this.password = hash //Aqui estou reatribuindo a senha mas agora ela criptografada
})
~~~~
//A acima estou falando: sempre com o UseSchema, antes de um registro ser criado (pre(save)) eu quero que ele execute uma função assincrona que pega a senha limpa faz a incroptografia e depois salva no banco de dados
//Temos que usar uma função acincrona pq não sabemos quanto tempo vai levar a criptografia, pq para fazer isso o bscript da varios "saltos" para gerar a criptografia.
//O bcrypt tem um método chamado hash, ele é quem embaralha a senha, 
 no primeiro parametro temos que referenciar onde estar
 o campo de senha -> this.password é igual a UseSchema.password, 
 no segundo parametro colocamos a quantidade de vezes que queremos que 
 ele faça a operação de embaralhamento


ATENÇÃO: Note que não usamos arroy function, por algum motivo estavadando erro por usar a função desse jeito, então



## 31 - Verifcar no mongodb como está acriptografia!

## 32 - Agora fazer outras rotas usando esse mesmo modelo!


<div align="center" >
 <p>Por Abner Santos</P>
 </div>
 





































