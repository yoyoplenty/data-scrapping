// const AppError = require("../utils/appError");
// const puppeteer = require("puppeteer");
// const ScrappedData = require("../models/data");

// async function configureTheBrowser(url) {
//     const browser = await puppeteer.launch({
//         args: ["--disable-gpu", "--disable-dev-shm-usage", "--disable-setuid-sandbox", "--no-first-run", "--no-sandbox", "--no-zygote", "--single-process"],
//     });
//     const page = await browser.newPage();
//     await page.goto(url, { waitUntil: "load" });
//     return page;
// }

// async function checkDetails(page) {
//     let data = await page.evaluate(() => {
//         const list = [];
//         const items = document.querySelectorAll("div.itm");
//         for (const item of items) {
//             console.log(item);
//             list.push({
//                 name: item.querySelector(".name").innerHTML,
//                 price: item.querySelector(".prc").innerHTML,
//                 link: item.querySelector(".core").href,
//                 img_url: item.querySelector(".img").getAttribute("data-src"),
//             });
//         }
//         return list;
//     });
//     return data;
// }

// exports.scrapData = async (req, res, next) => {
//     try {
//         let url = req.query.url ? `https://www.${req.query.url}` : "https://www.jumia.com.ng/phones-tablets/";
//         let page = await configureTheBrowser(url);
//         let results = await checkDetails(page);
//         console.log(results);
//         await ScrappedData.insertMany(results);
//         let savedData = await ScrappedData.updateMany({}, { url });
//         res.send(savedData);
//     } catch (error) {
//         console.log(error);
//         return next(new AppError(500, "failed", "server error"));
//     }
// };
