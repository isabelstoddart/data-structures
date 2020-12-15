var async = require('async'); 

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

// blogEntries.push(new BlogEntry(4, 'September 29, 2020 15:15:00', true, true, ["Work on project for Major Studio 1"], true, 7, 1));
// blogEntries.push(new BlogEntry(6, 'September 30, 2020 20:15:00', false, true, ["Finish project for Major Studio 1"], true, 5, 2));
// blogEntries.push(new BlogEntry(2, 'October 2, 2020 9:00:00',true, true, ["Read for Data Visulaization and Information Aesthetics","Work on Data Structures assignment 5"], true, 9, 0));
// blogEntries.push(new BlogEntry(4, 'October 4, 2020 23:29:00', true, true, ["Work on Data Structures assignment 5", "Read for Data Structures"], true, 9, 0));
// blogEntries.push(new BlogEntry(2, 'October 5, 2020 20:15:00', false, true, ["Work on revising project for Major Studio 1"], false, 8, 0));
// blogEntries.push(new BlogEntry(3, 'October 6, 2020 14:30:00', false, true, ["Work on revising project for Major Studio 1"], true, 9, 1));
// blogEntries.push(new BlogEntry(2, 'October 7, 2020 10:00:00',false, true, ["Read for Data Structures"], true, 6, 1));
// blogEntries.push(new BlogEntry(1, 'October 8, 2020 11:30:00', true, true, ["Work on Data Structures assignment 6", "Read for Data Visulaization and Information Aesthetics"], true, 10, 1));
// blogEntries.push(new BlogEntry(2, 'October 12, 2020 20:00:00',false, true, ["Finish assignment for Data Visualization and Information Aesthetics"], true, 8, 1));
// blogEntries.push(new BlogEntry(1, 'October 13, 2020 17:30:00', false, true, ["Submit Data Structures assignment 6", "Read for Data Structures"], true, 6, 0));

blogEntries.push(new BlogEntry(3, 'October 26, 2020 16:15:00', true, true, ["Finish Data Visualization and Information Aesthetics assignment 3", "Work on Machine Learning assignments"], true, 7, 1));
blogEntries.push(new BlogEntry(2, 'September 28, 2020 20:15:00', false, true, ["Make presentation on Understanding Comics by Scott McCloud"], true, 8, 1));
blogEntries.push(new BlogEntry(8, 'November 2, 2020 18:00:00',false, true, ["Finish Major Studio 1 assignment","Prepare for Smithsonian presentation"], true, 6, 3));
blogEntries.push(new BlogEntry(9, 'November 3, 2020 20:29:00', true, true, ["Read for Data Structures", "Vote", "Watch the election"], true, 4, 5));
blogEntries.push(new BlogEntry(9, 'November 4, 2020 20:15:00', false, true, ["Write up IEEE Vis summary for Data Structures"], true, 8, 1));
blogEntries.push(new BlogEntry(9, 'November 5, 2020 20:30:00', false, true, ["Read for Machine Learning", "Work on Machine Learning Assignments"], true, 9, 1));
blogEntries.push(new BlogEntry(9, 'November 6, 2020 20:00:00',false, true, ["Work on Data Visualization and Information Aesthetics assignment 4"], true, 8, 1));
blogEntries.push(new BlogEntry(1, 'November 7, 2020 11:30:00', false, true, ["Celebrate Biden's Win!"], true, 10, 1));

blogEntries.push(new BlogEntry(2, 'November 10, 2020 18:00:00',false, true, ["Complete Machine Learning Canvas Assignment 4"], true, 7, 2));
blogEntries.push(new BlogEntry(4, 'November 17, 2020 17:30:00', false, true, ["Make up data visualization method presentation on Chernoff Maps", "Work on prototype for Major Studio 1 final assignment"], true, 6, 2));

blogEntries.push(new BlogEntry(4, 'November 20, 2020 18:15:00', false, true, ["Work on Machine Learning Canvas Discussion Assignment 5"], true, 7, 1));
blogEntries.push(new BlogEntry(2, 'November 23, 2020 20:15:00', false, true, ["Work on prototype for Major Studio 1 final project"], true, 6, 2));
blogEntries.push(new BlogEntry(1, 'November 24, 2020 16:00:00',false, true, ["Work on Major Studio 1 final project","Work on Data Visualization and Information Aesthetics final project"], true, 7, 1));
blogEntries.push(new BlogEntry(2, 'November 29, 2020 23:00:00', false, true, ["Write up Machine Learning Envisaged application writing assignment 2"], true, 9, 0));
blogEntries.push(new BlogEntry(2, 'December 1, 2020 20:00:00', false, true, ["Read for Data Structures"], true, 8, 1));

blogEntries.push(new BlogEntry(5, 'December 6, 2020 14:30:00', false, true, ["Work on Major Studio 1 final assignments", "Work on Data Visualization and Information Aesthetics final project"], true, 7, 2));
blogEntries.push(new BlogEntry(9, 'December 7, 2020 18:00:00',false, true, ["Complete all Major Studio 1 assignments"], true, 3, 4));

blogEntries.push(new BlogEntry(6, 'December 9, 2020 21:30:00', false, true, ["Work on Machine Learning final assignments", "Work on Data Visualization and Information Aesthetics final project"], true, 6, 3));
blogEntries.push(new BlogEntry(5, 'December 14, 2020 22:00:00',false, true, ["Finish Final assignment for Data Visualization and Information Aesthetics"], true, 6, 2));
blogEntries.push(new BlogEntry(6, 'December 15, 2020 18:30:00', false, true, ["Submit Data Structures final assignments"], true, 4, 2));

console.log(blogEntries);

var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

var params = {};

async.eachSeries(blogEntries, function(value, callback) {
   params.Item = blogEntries[blogEntries.indexOf(value)]; 
   params.TableName = "processblog";

    dynamodb.putItem(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
    setTimeout(callback, 1000); 
}); 