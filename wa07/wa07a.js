const { Client } = require('pg');
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

// Sample SQL statement to create a table: 
//var thisQuery = "CREATE TABLE aameetings (address varchar(100), lat double precision, long double precision);";
var thisQuery = "CREATE TABLE aa_meetings (address varchar(100), lat double precision, long double precision, zip varchar(100), building varchar(100), floorInfo varchar(150), groupName varchar(50), wcAccess int, day varchar(10), startTime varchar(10), endTime varchar(10), meetingType varchar(30), specialInterest varchar(50), details varchar(250));"; 
// Sample SQL statement to delete a table: 
//var thisQuery = "DROP TABLE aa_meetings;"; 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});