// npm install aws-sdk
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "processblog",
    KeyConditionExpression: "#stresslevel = :stress and #dt between :minTime and :maxTime", // the query expression
    ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
        "#stresslevel" : "PK",
        "#dt" : "SK"
    },
    ExpressionAttributeValues: { // the query values
        ":stress": {N: "2"},
        ":minTime" : {N: new Date('September 1, 2020 1:00:00').getTime().toString()},
        ":maxTime" : {N: new Date('November 30, 2020 23:00:00').getTime().toString()}
    }
};

dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log("***** ***** ***** ***** ***** \n", item);
        });
    }
});