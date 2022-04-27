const express = require('express')
const mongo = require('./mongo')
const puppeteer = require('./scrapper')
const controller = require('./controller')
const config = require('./env')
const PORT = config.port
const app = express()

app.get("/", (req,res) => {
    res.status(204).send(``);
})

app.get("/scrap_category/:category", controller.scrapCategory) //scrap_category/category

app.get("/delete_category/:category", (req,res) => {//delete_category/category
    let category = req.params.category;    
    category = category.charAt(0).toUpperCase() + category.slice(1);
    mongo.deleteDB(category);
    res.status(204).send(``);
})

app.get("/find_books/:category", controller.findBooks)//find_books/category?number=value&flag=boolean

app.get("/find_books_under_stock/:category", controller.findBooksUnderStock)//find_books_under_stock/category?number=value

app.listen(PORT, function(){
    console.log(`Running on port ${PORT}.`);
});