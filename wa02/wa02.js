// npm install cheerio
var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
var content = fs.readFileSync('AAMeetings/m4.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// write the addresses to a text file
var AAMeetingsAddresses = '';

$('td').each(function(i, elem) {
    if($(elem).attr("style")=="border-bottom:1px solid #e3e3e3; width:260px") {
        AAMeetingsAddresses += (($(elem).html().split('<br>')[2].trim().split(',')[0])) + '\n';
    }
});

fs.writeFileSync('AAMeetings/AAMeetingsAddresses.txt', AAMeetingsAddresses)
