const puppeteer = require('puppeteer')
const mongo = require('./mongo')
const config = require('./env')

const url = config.url

async function scrapeCurrentPage(scrapedData, browser, page, category){
    let today = new Date();
	let crawlerdate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    scrapedData = scrapedData ? scrapedData : [];
    await page.waitForSelector('.page_inner');
    let urls = await page.$$eval('section ol > li', links => {
        links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
        links = links.map(el => el.querySelector('h3 > a').href)
        return links;
    });
    // Loop through each of those links, open a new page instance and get the relevant data from them
    let pagePromise = (link) => new Promise(async(resolve, reject) => {
        let dataObj = {};
        let newPage = await browser.newPage();
        await newPage.goto(link);
        dataObj['Titulo'] = await newPage.$eval('.product_main > h1', text => text.textContent);
        dataObj['Preco'] = await newPage.$eval('.price_color', text => text.textContent);
        dataObj['Categoria'] = category;
        dataObj['Estoque'] = await newPage.$eval('.instock.availability', text => {
            text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
            let regexp = /^.*\((.*)\).*$/i;
            let stockAvailable = regexp.exec(text)[1].split(' ')[0];
            return parseInt(stockAvailable);
        });
        dataObj['Descricao'] = await newPage.$eval('#product_description', div => div.nextSibling.nextSibling.textContent);
        dataObj['DataDeCrawler'] = crawlerdate;
        resolve(dataObj);
        await newPage.close();
    });

    for(link in urls){
        let currentPageData = await pagePromise(urls[link]);
        scrapedData.push(currentPageData);
    }
    let nextButtonExist = false;
    try{
        const nextButton = await page.$eval('.next > a', a => a.textContent);
        nextButtonExist = true;
    }
    catch(err){
        nextButtonExist = false;
    }
    if(nextButtonExist){
        await page.click('.next > a');   
        return scrapeCurrentPage(scrapedData, browser, page, category);
    }
    await page.close();
    return scrapedData;
}

const scrapBooks = async (category) => {
    return puppeteer.launch({
        args: ["--disable-setuid-sandbox"],
        'ignoreHTTPSErrors': true
    }).then(async function(browser){
        const page = await browser.newPage();

        await page.goto(url);
        
        try{
            let selectedCategory
            selectedCategory = await page.$$eval('.side_categories > ul > li > ul > li > a', (links, _category) => {
			links = links.map(a => a.textContent.replace(/(\r\n\t|\n|\r|\t|^\s|\s$|\B\s|\s\B)/gm, "") === _category ? a : null);
			let link = links.filter(tx => tx !== null)[0];
			return link.href;
		    }, category);

            console.log(selectedCategory);

            await page.goto(selectedCategory);
            let scrapedData = [];
            await scrapeCurrentPage(scrapedData, browser, page, category);
            await browser.close();
            return scrapedData;
            //try {
            //    await mongo.insertDB(scrapedData)
            //} catch(err){
            //    console.log(`Can't upload data`);
            //    res.status(500).send(`500 Internal Server Error`);
            //    return
            //}
            //await browser.close();
            //res.status(204).send(``);
        } catch(err){
            console.log(err)
            throw err
        }                
    })
}

module.exports = {
    scrapeCurrentPage,
    scrapBooks
}