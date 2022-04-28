# driva-crawler-node

## Projeto feito com node.js(16.14.2) e mongoDB(4.2) no Windows 8.1

Dependências usadas:
```
- express
- mongodb
- nodemon
- puppeteer
```
Para instalar cada dependência rodar no cmd:
```
npm i <dependencia>
```
### Para rodar a API
#### O passo 1 é para configurar localmente, se não for o caso pode ir para o passo 2

1. Criar usuário no banco do mongoDB _(se já tiver um, ir para o passo adiante)_:
- Pelo cmd, ir até o local da pasta de instalação do mongo e ir no seguinte caminho
```/MongoDB/Server/<version>/bin/```
- Após isso, rodar no cmd o comando `mongo` para iniciar o terminal do mongo
- Digitar `use admin` e após isso rodar o comando :
```
createUser(user:<user>,pwd:<password>,roles[{role:<role>},{db:<database>}])
```
_Usado para o teste: `createUser(user:teste,pwd:123456,roles[{role:userAdmin},{db:local}])`_

2. Rodar o projeto _(É necessário ter os programas instalados com as dependências)_:
- Antes de tudo, alterar no caminho `./config/local/env.js` os campos `user`, `password` e `dbName` se já tiver algum local. Se você seguiu com o passo 1, não precisa alterar
- Após isso, para inicializar o banco localmente é só ir na janela de comando e rodar:
```
npm run dev
```
- Se for para inicializar ele conectando no banco da Driva, é só ir na janela de comando e rodar:
```
npm start
```
3. Testando as rotas no seu navegador _(Lembrando que para todos, é só substituir o `:category` pela categoria desejada)_:

- Para buscar uma categoria de livros no site e popular o banco de dados:
```
localhost:5000/scrap_category/:category
```
- Para excluir uma categoria de livros no banco:
```
localhost:5000/delete_category/:category
```
- Para procurar um certo número de uma categoria de livros, com possibilidade de forçar uma busca no site  (substituindo `value` por um __número inteiro positivo__ e `boolean` por _true_ ou _false_):
```
localhost:5000/find_books/:category?number=value&flag=boolean
```
Para procurar os livros de uma certa categoria que estão com estoque abaixo de um certo valor (substituindo `value` por um __número inteiro positivo__):
```
localhost:5000/find_books_under_stock/:category?number=value
```

Vale também notar que _não foi feito esse projeto em docker, então talvez a configuração do Dockerfile esteja errada_
