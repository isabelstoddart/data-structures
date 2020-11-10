# Weekly Assignment 9
### For data structures at Parsons School of Design
## Part One

I decided to use a PostgreSQL table for my sensor data. For this assignment, I am using my sensor to track the temperature and humidity in my bathroom that I share with my brother (I got his permission to put the sensor in the bathroom before starting this assignment). I am hoping this data will track when the shower is on and when the hairdryer is being used and will possibly show other patterns of bathroom use between a 19 year old and 24 year old (male and female). 

For part one of this assignment, I copied the starter code to create my table in PostgreSQL. This code can be found in wa09a.js. I have attached the starter code below:

```const { Client } = require('pg');

```// AWS RDS POSTGRESQL INSTANCE
```var db_credentials = new Object();
```db_credentials.user = 'aaron';
`db_credentials.host = 'dsdemo.c2g7qw1abcde.us-east-1.rds.amazonaws.com';
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

