
let express = require("express");
const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');
let MongoClient = require('mongodb').MongoClient;

let app = express();
app.listen(3000, () => console.log("Server running on port 3000!"))

app.get("/:id", (req, res) => {
    // res.send("Your name is " + req.params.id + "\n");
    GetWeeklyScoreById(req.params.id, res);
    console.log("senmt!");
       

});

var http = require('http'),
    fs = require('fs');


fs.readFile('./1.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(4000);
    console.log("Server running on port 4000!");
});

function GetWeeklyScoreById2(id){
    var options = {
        url: `https://www.whoscored.com/Players/` + id + '/Show/Salih-Ucan',
        transform: body => cheerio.load(body)
    }
    rp(options)
        .then(function ($) { // when web site loaded
            const tableBody = $('.table-body');
            console.log($tableBody);
            // process.stdout.write(`.`);
            // const matches = $('player-matches-table');
            // res.send("The score of the current week is " + score + "\n");       
        })
        .catch(function(err){
            console.log(err);
       });
}

function GetWeeklyScoreById(id, res){
    console.log("GetWeeklyScoreById called!");
    request({
        url: 'https://www.whoscored.com/Players/93854/Show/Salih-Ucan',
        headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'},
        //url: 'localhost:4000',
        jar: true
      }, function (error, response, html) {    
        
    if (!error && response.statusCode == 200) {
        console.log(html);
        // const $ = cheerio.load(html);
        // const table = $('player-matches-table .table-body')
        // res.send(table);       

       /*  $('player-matches-table .table-body').each((i, el) => {
        const title = $(el)
            .find('.post-title')
            .text()
            .replace(/\s\s+/g, '');
        const link = $(el)
            .find('a')
            .attr('href');
        const date = $(el)
            .find('.post-date')
            .text()
            .replace(/,/, '');

        // Write Row To CSV
        writeStream.write(`${title}, ${link}, ${date} \n`);
        }); */

        console.log('Scraping Done...');
    }
    else{
        console.log('error:' + error);
        console.log('statusCode:' + response.statusCode);
        console.log('html:' + html);
        res.send('<html style="height:100%"><head><META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW"><meta name="format-detection" content="telephone=no"><meta name="viewport" content="initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><script type="text/javascript" src="/_Incapsula_Resource?SWJIYLWA=719d34d31c8e3a6e6fffd425f7e032f3"></script></head><body style="margin:0px;height:100%"><iframe id="main-iframe" src="/_Incapsula_Resource?CWUDNSAI=22&xinfo=4-92893352-0%200NNN%20RT%281601840553506%2061%29%20q%280%20-1%20-1%20-1%29%20r%280%20-1%29%20B14%284%2c200%2c0%29%20U18&incident_id=86000030279835428-379731828310147268&edet=14&cinfo=04000000&rpinfo=0" frameborder=0 width="100%" height="100%" marginheight="0px" marginwidth="0px">Request unsuccessful. Incapsula incident ID: 86000030279835428-379731828310147268</iframe></body></html>');
        
    }
    });
}