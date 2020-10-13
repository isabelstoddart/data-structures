var request = require('request');
var fs = require('fs');

var urls = ["https://parsons.nyc/aa/m01.html",  
"https://parsons.nyc/aa/m02.html",  
"https://parsons.nyc/aa/m03.html",  
"https://parsons.nyc/aa/m04.html",  
"https://parsons.nyc/aa/m05.html",  
"https://parsons.nyc/aa/m06.html",  
"https://parsons.nyc/aa/m07.html",  
"https://parsons.nyc/aa/m08.html",  
"https://parsons.nyc/aa/m09.html",  
"https://parsons.nyc/aa/m10.html"]


for (let i = 0; i < urls.length; i ++)
{
    request(urls[i], function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data-structures/wa01/m' + (i+1) + '.txt', body);
    }
    else {console.log("Request failed!")}
    });
}
