# Weekly Assignment 6
### For data structures at Parsons School of Design

## Part One
Part one of this assignment was to write and execute a query for the AA data. 

For this assignment I started with the starter code shown below:

    const { Client } = require('pg');
    const cTable = require('console.table');

    // AWS RDS POSTGRESQL INSTANCE
    var db_credentials = new Object();
    db_credentials.user = 'aaron';
    db_credentials.host = 'aa2020.c2g7qw1juwkg.us-east-1.rds.amazonaws.com';
    db_credentials.database = 'aa';
    db_credentials.password = process.env.AWSRDS_PW;
    db_credentials.port = 5432;

    // Connect to the AWS RDS Postgres database
    const client = new Client(db_credentials);
    client.connect();

    // Sample SQL statement to query meetings on Monday that start on or after 7:00pm: 
    var thisQuery = "SELECT mtgday, mtgtime, mtglocation, mtgaddress, mtgtypes FROM aadata WHERE mtgday = 'Monday' and mtghour >= 19;";

    client.query(thisQuery, (err, res) => {
        if (err) {throw err}
        else {
            console.table(res.rows);
            client.end();
        }
    });
    
After looking at the starter code and how a query for SQL is constructed, I satrted to think about what I wanted my query to do. Going off of my plan for the AA data I decided I wanted to query all of the unique addresses in the data. I did this because for my AA data plan I want to have a seperate table with just the unique addresses that can map back to the meeting data.
To do this I wrote the query below:

        var thisQuery = "SELECT lat,long,address FROM aalocations GROUP BY lat,long,address;";
        
   
In this query I selected the latitude, longitude, and address from the aa locations data and grouped them by latitude, longitude, and addresses. This got only the unique sets of latitude, longtitude, and address. For my query I did not include a WHERE clause because I wanted all of the address data. I did not want to hone in on just one type of address so a WHERE clause was not necessary.

The results of the query are below:





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
 
 I changed the starter code to include my variables for the BlogEntry object.
 
 ## Part Three
 Part three of this assignment was to populate the database. I started with the starter code shown below:
 
    var AWS = require('aws-sdk');
    AWS.config = new AWS.Config();
    AWS.config.region = "us-east-1";

    var dynamodb = new AWS.DynamoDB();

    var params = {};
    params.Item = blogEntries[0]; 
    params.TableName = "processblog";

    dynamodb.putItem(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
   
I added a loop to add all of my blog entries, instead of just the one, and made sure not to attempt more than 2 puts per second.

Finally, I checked my items on DynamoDB and all four were there.
