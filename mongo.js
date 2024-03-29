const { MongoClient } = require('mongodb');
const config = require('./env');
const mongoURL = config.mongoDB.url
const username = encodeURIComponent(config.mongoDB.user)
const password = encodeURIComponent(config.mongoDB.password)

const mongoURI =  `mongodb://${username}:${password}@${mongoURL}/`

console.log(mongoURI);

const client = new MongoClient(mongoURI);
const dbName = config.mongoDB.dbName

client.connect();
const db = client.db(dbName);
const collection = db.collection('documents');
console.log('Connected successfully to server');

async function insertDB(data){
    data.forEach(async d=>{
        let book = await collection.find({Titulo : d.Titulo}).toArray()
        if(book.length){
            collection.updateOne({Titulo : d.Titulo},{$set:{DataDeCrawler:d.DataDeCrawler}})
            return
        }
        collection.insertOne(d)
    })  
}

async function deleteDB(categoryBook){
    await collection.deleteMany({Categoria : categoryBook});
}

async function findBooksDB(categoryBook, numberStock = null){
    let query = {
        Categoria: categoryBook,
        Estoque: {$lt:numberStock}
    }
    if(!(query.Estoque.$lt) || (query.Estoque.$lt < 0)){
        delete query.Estoque
    }
    const queryBook = await collection.find(query).toArray();
    return queryBook;
}


module.exports = {
    insertDB,
    deleteDB,
    findBooksDB
}