const puppeteer = require('puppeteer');
var magic = require('./webtdatams.js').DataMagic;

(async() => {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    var site = { siteName: 'https://www.msn.com' };
    var runId = new Date().getDate() * 10000 + new Date().getHours() * 100 + new Date().getMinutes();

    

    page.on('request', req => {
        site[req._requestId] = {
            startTime: Date.now(),
            runId: runId,
            siteId : 2,
            url:req.url
        };
    });

    page.on('requestfailed', request => {
       
        var r = site[request._requestId];
        r.status= -1;  // Request failed  // my own status code 
        var duration = Date.now() - r.startTime;
        r.duration = duration;
        r.method = request.method;

        magic.logCall(r);
      });

    
    page.on('requestfinished', request => {
        var r = site[request._requestId];
       
        var duration = Date.now() - r.startTime;
        r.duration = duration;
        r.resourceType = request.resourceType;
        r.status = request._response.status;
        r.method = request.method;
       
        magic.logCall(r);

    });


    await page.goto(site.siteName);
    await page.waitFor(4000);
    await browser.close();

})()