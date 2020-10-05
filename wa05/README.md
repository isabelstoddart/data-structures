# Weekly Assignment 5
### For data structures at Parsons School of Design

## Part One
Part one of this assignment was to make a data model of the Process Blog data. I decided to make a school journal for my process blog. 

The variables included in each blog entry object are shown below:

![](ProcessBlogPlan.png)

The vaiables included are:

stressLevel(number), date(date), workedOut(boolean), happy(boolean), assignments(string), assignCmplt(boolean), hoursOfSleep(number), numOfCoff(number)

I made stress level the partition key so that I can find entries by how stressed I was that day. I made the sorting key the date time. 

## Part Two
Part two of the assignment was to create "Items" for DynamoDB and to store them in an array named blogEntries. I started with the starter code shown below:

    var blogEntries = [];

    class BlogEntry {
    constructor(primaryKey, date, entry, happy, iate) {
        this.pk = {};
        this.pk.N = primaryKey.toString();
        this.date = {}; 
        this.date.S = new Date(date).toDateString();
        this.entry = {};
        this.entry.S = entry;
        this.happy = {};
        this.happy.BOOL = happy; 
        if (iate != null) {
        this.iate = {};
        this.iate.SS = iate; 
        }
        this.month = {};
        this.month.N = new Date(date).getMonth().toString();
        }
    }

    blogEntries.push(new BlogEntry(0, 'August 28 2019', "Yay, first day of class!", true, ["Cheez-Its", "M&Ms"]));
    blogEntries.push(new BlogEntry(1, 'October 31, 2015', "I piloted my first solo flight!", true, ["pancakes"]));
    blogEntries.push(new BlogEntry(2, 8675309, "867-5309?", false));
    blogEntries.push(new BlogEntry(3, 'September 25, 2019', "I taught my favorite students.", true, ["peas", "carrots"]));

    console.log(blogEntries);
 
 I changed the starter code to include my vairables for the BlogEntry object.
 
 ## Part Three
 Part three of this assignment was to populate the database. I started with the starter code shown below:
 
    const { Client } = require('pg');
    var async = require('async');  
    const dotenv = require('dotenv');
    dotenv.config();  

    // AWS RDS POSTGRESQL INSTANCE
    var db_credentials = new Object();
    db_credentials.user = 'aaron';
    db_credentials.host = 'dsdemo.c2g7qw1juwkg.us-east-1.rds.amazonaws.com';
    db_credentials.database = 'mydb';
    db_credentials.password = process.env.AWSRDS_PW;
    db_credentials.port = 5432;

    var addressesForDb = [ { address: '63 Fifth Ave, New York, NY', latLong: { lat: 40.7353041, lng: -73.99413539999999 } }, { address: '16 E 16th St, New York,            NY', latLong: { lat: 40.736765, lng: -73.9919024 } }, { address: '2 W 13th St, New York, NY', latLong: { lat: 40.7353297, lng: -73.99447889999999 } } ];

    async.eachSeries(addressesForDb, function(value, callback) {
        const client = new Client(db_credentials);
        client.connect();
        var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.address + "', " + value.latLong.lat + ", " + value.latLong.lng + ");";
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
        setTimeout(callback, 1000); 
    }); 
    
For this one, I changed the RDS PostgreSQL information to match mine and read in my addresses JSON file to add to the database. 

## Part Four
Part four of this assignment was to check to make sure all of the addresses were added to the database. I started with the starter code below:

    const { Client } = require('pg');  
    const dotenv = require('dotenv');
    dotenv.config();  

    // AWS RDS POSTGRESQL INSTANCE
    var db_credentials = new Object();
    db_credentials.user = 'aaron';
    db_credentials.host = 'dsdemo.c2g7qw1juwkg.us-east-1.rds.amazonaws.com';
    db_credentials.database = 'mydb';
    db_credentials.password = process.env.AWSRDS_PW;
    db_credentials.port = 5432;

    // Connect to the AWS RDS Postgres database
    const client = new Client(db_credentials);
    client.connect();

    // Sample SQL statement to query the entire contents of a table: 
    var thisQuery = "SELECT * FROM aalocations;";

    client.query(thisQuery, (err, res) => {
      console.log(err, res.rows);
      client.end();
     });
     
 For this one, I changed the RDS PostgreSQL information to match mine and then added a query to get the count of all of the locations to confirm that I added the correct amount to the database. I found that 53 locations were added, so all of the code worked correctly.
