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
### Rodar localmente

1. Criar usuário no banco do mongoDB (se já tiver um, ir para o passo adiante)
- Pelo cmd, ir até o local da pasta de instalação do mongo e ir no seguinte caminho
```/MongoDB/Server/<version>/bin/```
- Após isso, rodar no cmd o comando `mongo` para iniciar o terminal do mongo
- Digitar `use admin` e após isso rodar o comando :
```
createUser(user:<user>,pwd:<password>,roles[{role:<role>},{db:<database>}])
```
_Usado para o teste: `createUser(user:teste,pwd:123456,roles[{role:userAdmin},{db:local}])`_

2. Rodar localmente (É necessário ter os programas instalados com as dependências)
- Antes de tudo, alterar no caminho `./config/local/env.js` os campos `user`, `password` e `dbName` se já tiver algum local. Se você seguiu com o passo 1, não precisa alterar
- Após isso, para inicializar o banco localmente é só ir na janela de comando e rodar:
```
npm run dev
```

3. Testando as rotas no seu navegador
Lembrando que para todos, é só substituir o `:category` pela categoria desejada

- Para buscar uma categoria de livros no site e popular o banco de dados:
```
localhost:5000/scrap_category/:category
```
- Para excluir uma categoria de livros no banco:
```
/delete_category/:category
```
- Para procurar um certo número de uma categoria de livros, com possibilidade de forçar uma busca no site  (substituindo `value` por um __número inteiro positivo__ e `boolean` por _true_ ou _false_):
```
/find_books/:category?number=value&flag=boolean
```
Para procurar os livros de uma certa categoria que estão com estoque abaixo de um certo valor (substituindo `value` por um __número inteiro positivo__):
```
/find_books_under_stock/:category?number=value
```
### Rodar no servidor
Olha, não consegui fazer o teste no servidor, porém idealmente seria seguir o mesmo roteiro da seção anterior, pulando o passos 1 e 2, e em vez de usar `npm run dev`, utilizar o `npm start` que já puxa a rota do banco da Driva.

Vale também notar que _não foi feito esse projeto em docker, então talvez a configuração do Dockerfile esteja errada_
