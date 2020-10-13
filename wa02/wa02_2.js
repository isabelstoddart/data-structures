//redone wa02 printing out a JSON file instead of a txt file

// npm install cheerio
var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
var content = fs.readFileSync('../wa01/m4.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// write the addresses to a text file
var AAMeetingsAddresses = [];

$('td').each(function(i, elem) {
    if($(elem).attr("style")=="border-bottom:1px solid #e3e3e3; width:260px") {
        AAMeetingsAddresses.push((($(elem).html().split('<br>')[2].trim().split(',')[0])));
    }
});

for(let i = 0; i < AAMeetingsAddresses.length; i++){
    fs.writeFileSync('../wa02/AAMeetingsAddresses.JSON', JSON.stringify(AAMeetingsAddresses))
}
