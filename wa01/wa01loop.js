for (var i = 1; i <= 10; i ++)
{
    if(i < 10) {
        var filenum = "m0" + i
    }
    else {
        var filenum = "m" + i
    }
    var request = require('request');
    var fs = require('fs');
    
    var inFile = "https://parsons.nyc/aa/" + filenum + ".html"
    var outFile = "/home/ec2-user/environment/AAMeetings/" + filenum + ".text"
    console.log(outFile)
    
    request(inFile, function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync(outFile, body);
    }
    else {console.log("Request failed!")}
    });
}
