var request = require('request');
const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config({path: '/home/ec2-user/environment/data-structures/.env'});

// PARTICLE PHOTON
var device_id = process.env.PHOTON_ID;
var access_token = process.env.PHOTON_TOKEN;
var particle_variable = 'sensor_data';
var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;
// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'isabelmsdv';
db_credentials.host = 'data-structures.cih8sqm2fyre.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

var humidity = 0;
var tempF = 0;

var getAndWriteData = function() {
    
    // Make request to the Particle API to get sensor values
    request(device_url, function(error, response, body) {
        
        // Store sensor value(s) in a variable
        var sv = JSON.parse(body).result;
        
        sv = sv.replace(/{|}/g, "")
        sv = sv.split(',')
        
        humidity = sv[0].match(/[+-]?([0-9]*[.])?[0-9]+/g)[0]
        tempF = sv[1].match(/[+-]?([0-9]*[.])?[0-9]+/g)[0]

        
        //Connect to the AWS RDS Postgres database
        const client = new Client(db_credentials);
        client.connect();

        // Construct a SQL statement to insert sensor values into a table
        var thisQuery = "INSERT INTO sensorData VALUES (E'" + tempF + "'," + humidity + ", DEFAULT);";
        
        console.log(thisQuery); // for debugging

        // Connect to the AWS RDS Postgres database and insert a new row of sensor values
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
};

// write a new row of sensor data every five minutes
setInterval(getAndWriteData, 300000);