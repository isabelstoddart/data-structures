const fs = require('fs');
const { Client } = require('pg');
var async = require('async');  
const dotenv = require('dotenv');
dotenv.config({path: '/home/ec2-user/environment/data-structures/.env'});

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'isabelmsdv';
db_credentials.host = 'data-structures.cih8sqm2fyre.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

//read in each json file seperately
var meetingsData = fs.readFileSync('../wa07/address_geocodes10.json');
meetingsData = JSON.parse(meetingsData)

async.eachSeries(meetingsData, function(value, callback) {
    // const client = new Client(db_credentials);
    // client.connect();
    async.eachSeries(value.dayTime, function(entry, callback) {
        const client = new Client(db_credentials);
        client.connect();
        var thisQuery = "INSERT INTO aa_meetings VALUES (E'" + value.address + "', " + value.latLong.lat + ", " + value.latLong.long + ", E'" 
                                                        + value.zip + "', E'" + value.building[0].replace(/'/g,"") + "', E'" + value.floorInfo.replace(/,/g,"").replace(/'/g,"") + "', E'" + value.groupName.replace(/'/g,"").replace(/,/g,"") + "', " 
                                                        + value.wcAccess + ", E'" + entry.day  + "', E'" + entry.startTime  + "', E'" + entry.endTime  + "', E'" 
                                                        + entry.meetingType.replace(/'/g,"")  + "', E'" + entry.specialInterest.replace(/,/g,"").replace(/'/g,"")  + "', E'" + value.details.replace(/,/g,"").replace(/'/g,"") + "');";
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
        setTimeout(callback, 1000); 
        console.log(thisQuery);
    }); 
    setTimeout(callback, 1000); 
    // console.log(thisQuery);
});