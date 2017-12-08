const puppeteer = require('puppeteer');
var magic = require('./webtdatams.js').DataMagic;

(async() => {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    var site = { siteName: 'https://www.msn.com' };
    var runId = new Date().getDate() * 10000 + new Date().getHours() * 100 + new Date().getMinutes();


    page.on('request', interceptedRequest => {
        site[interceptedRequest.url] = {
            startTime: Date.now(),
            runId: runId,
            siteId : 2
        };
    });

    
    page.on('requestfinished', msg => {
        site[msg.url].url = msg.url;
        var duration = Date.now() - site[msg.url].startTime;
        site[msg.url].duration = duration;
        site[msg.url].resourceType = msg.resourceType;
        site[msg.url].status = msg._response.status;
        site[msg.url].method = msg.method;
        
        var r = site[msg.url];

        magic.logCall(r);

    });


    await page.goto(site.siteName);

    await browser.close();

})()