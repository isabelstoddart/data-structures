var blogEntries = [];

class BlogEntry {
  constructor(stressLevel, date, workedOut, happy, assignments, assignComplt, hoursOfSleep, numOfCoff) {
    this.PK = {};
    this.PK.N = stressLevel.toString();
    this.date = {}; 
    this.date.S = new Date(date).toDateString();
    this.workedOut = {};
    this.workedOut.BOOL = workedOut;
    this.happy = {};
    this.happy.BOOL = happy; 
    if (assignments != null) {
      this.assignments = {};
      this.assignments.SS = assignments; 
    }
    this.assignComplt = {};
    this.assignComplt.BOOL = assignComplt;
    this.hoursOfSleep = {};
    this.hoursOfSleep.N = hoursOfSleep.toString();
    this.numOfCoff = {}
    this.numOfCoff.N = numOfCoff.toString();
    this.SK = {};
    this.SK.N = new Date(date).getTime().toString();
  }
}

blogEntries.push(new BlogEntry(4, 'September 29, 2020 3:15:00', true, true, ["Work on Project for Major Studio 1"], true, 7, 1));
blogEntries.push(new BlogEntry(6, 'September 30, 2020 5:15:00', false, true, ["Finish Project for Major Studio 1"], true, 5, 2));
blogEntries.push(new BlogEntry(2, 'October 2, 2020 9:00:00',true, true, ["Read for Data Visulaization and Information Aesthetics","Work on Data Structures assignment 5"], true, 9, 0));
blogEntries.push(new BlogEntry(4, 'October 4, 2020 11:29:00', true, true, ["Work on Data Structures assignment 5", "Read for Data Structures"], true, 9, 0));

console.log(blogEntries);

var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

var params = {};

for(let i=0; i < blogEntries.length; i++){
  params.Item = blogEntries[i]; 
  params.TableName = "processblog";

  dynamodb.putItem(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}