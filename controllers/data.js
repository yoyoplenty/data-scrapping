const AppError = require("../utils/appError");
const cheerio = require("cheerio");
const axios = require("axios");
const ScrappedData = require("../models/data");

const scrapperScript = async (url) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const DataBooks = $("div.itm");
        const scrapedData = [];

        DataBooks.each((index, el) => {
            const scrapItem = { name: "", price: "", link: "", img_url: "" };
            scrapItem.name = $(el).children("article").children("a").children(".name").text();
            scrapItem.price = $(el).children("article").children("a").children(".prc").text();
            scrapItem.link = $(el).children("article").children("a").attr("href");
            scrapItem.img_url = $(el).children("article").children("a").children("img").attr("data-src");
            scrapedData.push(scrapItem);
        });
        return {
            scrapedData,
            data,
        };
    } catch (error) {
        console.error(error);
    }
};

exports.getData = async (req, res, next) => {
    try {
        let url = req.query.url ? `https://www.${req.query.url}` : "https://www.jumia.com.ng/phones-tablets/";
        let results = await scrapperScript(url);
        let { data, scrapedData } = results;
        await ScrappedData.insertMany(scrapedData);
        await ScrappedData.updateMany({}, { url });
        res.send(data);
    } catch (error) {
        console.log(error);
        return next(new AppError(500, "failed", "server error"));
    }
};
