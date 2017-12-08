const sql = require('mssql')

var DataMagic = function() {};


const config = {
    user: 'Why', // update me
    password: 'Wgyyy', // update me
    server: 'WhyPassowrds.windows.net', // update me
    database: 'HealthCheck',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}


DataMagic.prototype.logCall = function(callItem) {


    const pool2 = new sql.ConnectionPool(config, err => {
        
    
        pool2.request() // or: new sql.Request(pool2)
        .input('url', sql.NVarChar(250), callItem.url)
        .input('startTime', sql.DateTime, new Date(callItem.startTime))
        .input('duration', sql.Int, callItem.duration)
        .input('status', sql.Int, callItem.status)
        .input('siteId', sql.Int, callItem.siteId)
        .input('runId', sql.Int, callItem.runId)
        .input('resourceType', sql.NVarChar(50), callItem.resourceType)
        .input('method', sql.VarChar(10), callItem.method)
        .query('INSERT INTO NetworkCall(Url,StartTime,Duration,Status,SiteId,RunId,ResourceType,Method) VALUES  (@url, @startTime, @duration, @status, @siteId, @runId,@resourceType,@method);', (err, result) => {
            // ... error checks

        })
    })
    
    pool2.on('error', err => {
        console.log('error p',err);
    })

};

exports.DataMagic = new DataMagic();