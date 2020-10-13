const { Client } = require('pg');
const cTable = require('console.table');
const dotenv = require('dotenv');
dotenv.config({path: '/home/ec2-user/environment/data-structures/.env'});

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'isabelmsdv';
db_credentials.host = 'data-structures.cih8sqm2fyre.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to query meetings on Monday that start on or after 7:00pm: 
var thisQuery = "SELECT lat,long,address FROM aalocations GROUP BY lat,long,address;";

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
        console.table(res.rows);
        client.end();
    }
});