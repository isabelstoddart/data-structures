// npm install request
// mkdir data

//m01
var request = require('request');
var fs = require('fs');

request('https://parsons.nyc/aa/m01.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data-structures/wa01/m01.txt', body);
    }
    else {console.log("Request failed!")}
});

//m02
var request = require('request');
var fs = require('fs');

request('https://parsons.nyc/aa/m02.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data-structures/wa01/m02.txt', body);
    }
    else {console.log("Request failed!")}
});

//m03
var request = require('request');
var fs = require('fs');

request('https://parsons.nyc/aa/m03.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data-structures/wa01/m03.txt', body);
    }
    else {console.log("Request failed!")}
});


//m04
var request = require('request');
var fs = require('fs');

request('https://parsons.nyc/aa/m04.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data-structures/wa01/m04.txt', body);
    }
    else {console.log("Request failed!")}
});


//m05
var request = require('request');
var fs = require('fs');

request('https://parsons.nyc/aa/m05.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data-structures/wa01/m05.txt', body);
    }
    else {console.log("Request failed!")}
});


//m06
var request = require('request');
var fs = require('fs');

request('https://parsons.nyc/aa/m06.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data-structures/wa01/m06.txt', body);
    }
    else {console.log("Request failed!")}
});

//m07
var request = require('request');
var fs = require('fs');

request('https://parsons.nyc/aa/m07.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data-structures/wa01/m07.txt', body);
    }
    else {console.log("Request failed!")}
});

//m08
var request = require('request');
var fs = require('fs');

request('https://parsons.nyc/aa/m08.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data-structures/wa01/m08.txt', body);
    }
    else {console.log("Request failed!")}
});


//m09
var request = require('request');
var fs = require('fs');

request('https://parsons.nyc/aa/m09.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data-structures/wa01/m09.txt', body);
    }
    else {console.log("Request failed!")}
});

//m10
var request = require('request');
var fs = require('fs');

request('https://parsons.nyc/aa/m10.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data-structures/wa01/m10.txt', body);
    }
    else {console.log("Request failed!")}
});
