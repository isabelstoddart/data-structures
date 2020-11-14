# Weekly Assignment 9
### For data structures at Parsons School of Design

## Temperature Sensor Code

I have included the code I am flashing to the temperature sensor in dht-test.ino. 

## Setup Part One

I decided to use a PostgreSQL table for my sensor data. For this assignment, I am using my sensor to track the temperature and humidity in my bathroom that I share with my brother (I got his permission to put the sensor in the bathroom before starting this assignment). I am hoping this data will track when the shower is on and when the hairdryer is being used and will possibly show other patterns of bathroom use of a 19 year old and 24 year old (male and female). 

For part one of the setup, I copied the starter code to create my table in PostgreSQL. I changed the starter code to include my database credentials. I also changed the CREATE TABLE statement to include 3 variables: temp, humidity, and sensorTime. This code can be found in wa09a.js. I have attached the starter code below:

    const { Client } = require('pg');

    // AWS RDS POSTGRESQL INSTANCE
    var db_credentials = new Object();
    db_credentials.user = 'aaron';
    db_credentials.host = 'dsdemo.c2g7qw1abcde.us-east-1.rds.amazonaws.com';
    db_credentials.database = 'mydb';
    db_credentials.password = process.env.AWSRDS_PW;
    db_credentials.port = 5432;

    // Connect to the AWS RDS Postgres database
    const client = new Client(db_credentials);
    client.connect();

    // Sample SQL statement to create a table: 
    var thisQuery = "CREATE TABLE sensorData ( sensorValue double precision, sensorTime timestamp DEFAULT current_timestamp );";

    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });

## Setup Part Two

For part two of the setup I made sure to change the stop the environment variable for the EC2 Instance to Never.

## Setup Part Three

For part three of the setup I installed and initialized pm2

## Main Assignment

The main part of this assignment is to write a script to make a request to the Partile API URL to parse the result of the API request and insert the appropraite data into the database. 

I used the starter code to complete this main part. I made quite a few changes to the starter code. I changed the starter code to include my database credentials. I changed the particle variable to be sensor_data, the variable I am pulling in from the API. I then created two new variables (tempF and humidity) because sensor_data is a string that contains the temperature and humidity I want to put into the table. I parsed the string and pulled out just the temperature value and the humidity value and then changed the INSERT INTO query statement to insert the temperature and humidity into my table. 

This code can be found under wa09worker.js. I have attached the starter code below:

    var request = require('request');
    const { Client } = require('pg');

    // PARTICLE PHOTON
    var device_id = process.env.PHOTON_ID;
    var access_token = process.env.PHOTON_TOKEN;
    var particle_variable = 'analogvalue';
    var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;

    // AWS RDS POSTGRESQL INSTANCE
    var db_credentials = new Object();
    db_credentials.user = 'aaron';
    db_credentials.host = process.env.AWSRDS_EP;
    db_credentials.database = 'mydb';
    db_credentials.password = process.env.AWSRDS_PW;
    db_credentials.port = 5432;

    var getAndWriteData = function() {
    
        // Make request to the Particle API to get sensor values
        request(device_url, function(error, response, body) {
        
            // Store sensor value(s) in a variable
            var sv = JSON.parse(body).result;
        
            // Connect to the AWS RDS Postgres database
            const client = new Client(db_credentials);
            client.connect();

            // Construct a SQL statement to insert sensor values into a table
            var thisQuery = "INSERT INTO sensorData VALUES (" + sv + ", DEFAULT);";
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
    
I then modified the ecosystem.config.js file with my variables and used PM2 to run the code.

I then checked my work using the starter code given. After changing the database credentials and the third query to select tempF and humidity instead of sensorValue I found that everything was working correctly. This code can be found under wa09check.js. I have included this starter code below:

    const { Client } = require('pg');
    const cTable = require('console.table');

    // AWS RDS POSTGRESQL INSTANCE
    var db_credentials = new Object();
    db_credentials.user = 'aaron';
    db_credentials.host = process.env.AWSRDS_EP;
    db_credentials.database = 'mydb';
    db_credentials.password = process.env.AWSRDS_PW;
    db_credentials.port = 5432;

    // Connect to the AWS RDS Postgres database
    const client = new Client(db_credentials);
    client.connect();

    // Sample SQL statements for checking your work: 
    var thisQuery = "SELECT * FROM sensorData;"; // print all values
    var secondQuery = "SELECT COUNT (*) FROM sensorData;"; // print the number of rows
    var thirdQuery = "SELECT sensorValue, COUNT (*) FROM sensorData GROUP BY sensorValue;"; // print the number of rows for each sensorValue

    client.query(thisQuery, (err, res) => {
        if (err) {throw err}
        else {
        console.table(res.rows);
        }
    });

    client.query(secondQuery, (err, res) => {
        if (err) {throw err}
        else {
        console.table(res.rows);
        }
    });

    client.query(thirdQuery, (err, res) => {
        if (err) {throw err}
        else {
        console.table(res.rows);
        }
        client.end();
    });
