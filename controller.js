const scrapper = require('./scrapper')
const mongo = require('./mongo')
async function scrapCategory(req,res){
    let category = req.params.category;
    category = category.charAt(0).toUpperCase() + category.slice(1);
    let scrappedData
    try{
        scrappedData = await scrapper.scrapBooks(category)
        try {
            await mongo.insertDB(scrappedData)
        } catch(err){
            console.log(`Can't upload data`);
            res.status(500).send(`500 Internal Server Error`);
            return
        }
        res.status(204).send(``);
    }catch(err){
        console.log(`There's no category that matches. Try again`)
        res.status(404).send("404 Not Found");
        return
    }
}

async function findBooks(req,res){
    const numberBooks = parseInt(req.query.number)
    const flag = req.query.flag
    let category = req.params.category;
    category = category.charAt(0).toUpperCase() + category.slice(1);
    if(flag === 'true'){
        let scrappedData
        try{
            scrappedData = await scrapper.scrapBooks(category)
            try {
                await mongo.insertDB(scrappedData)
                console.log(await mongo.findBooksDB(category))
            } catch(err){
                console.log(`Can't upload data`);
                res.status(500).send(`500 Internal Server Error`);
                return
            }
        }catch(err){
            console.log(`There's no category that matches. Try again`)
            res.status(404).send("404 Not Found");
            return
        }
    }
    
    let data = await mongo.findBooksDB(category);
    if(numberBooks > 0){
        books = data.slice(0, numberBooks);
    }
    else{
        books = data;
    }
    res.status(200).send(books);
}

async function findBooksUnderStock(req,res){
    const numberStock = parseInt(req.query.number);
    let category = req.params.category;
    category = category.charAt(0).toUpperCase() + category.slice(1);
    let data = await mongo.findBooksDB(category,numberStock);
    res.status(200).send(data);

}

module.exports = {
    scrapCategory,
    findBooks,
    findBooksUnderStock
}