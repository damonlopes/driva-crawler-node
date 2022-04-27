# driva-crawler-node

Projeto feito com node.js e mongoDB



Para buscar uma categoria de livros no site e popular o banco de dados:
/scrap_category/category

Para excluir uma categoria de livros no banco:
/delete_category/category

Para procurar um certo número de uma categoria de livros, com possibilidade de forçar uma busca no site:
/find_books/category?number=value&flag=boolean (substituindo value por um número e boolean por true ou false)

Para procurar os livros de uma certa categoria que estão com estoque abaixo de um certo valor:
/find_books_under_stock/category?number=value (substituindo value por um número)