# Weekly Assignment 7
### For data structures at Parsons School of Design

## Process
The purpose of this assignment was to finish parsing and cleaning the rest of the data in all zones, and to update/replace the PostgreSQL table with the new data.

### Parsing the Data
For this assignment I worked with Amina Brown and James Troxel. We started with parsing the rest the html files to get out the data we wanted. We ended up parsing the floor info, group name, details, if there is wheelchair access, day, start time, end time, special interest, zip, address, building, and meeting type for each meeting. I was in charge of parsing the day, start time, end time, meeting type, and special interest of each meeting in each location. To do this I created a loop that went through each location and got the information for each individual meeting within that location. I then created an array for each location of an array of objects with all the individual meeting data. This allowed for each set of meetings to be mapped back to the correct location. The code used is included below:

      $("td[style='border-bottom:1px solid #e3e3e3;width:350px;']").each(function(i, elem) {
            seperate = $(elem).html().split('<br>\n                    \t<br>');
            var daytimes = [];
            for (let i = 0; i < seperate.length-1; i++){
                  var daytimeobject = {
                        day: "",
                        startTime: "",
                        endTime: "",
                        meetingType: "",
                        specialInterest: ""
                  }
                  daytimeobject.day = seperate[i].trim().split('From')[0].trim().split('<b>')[1];
                  daytimeobject.startTime = seperate[i].trim().split('</b>')[1].trim().split('to')[0].split('<b>')[0].trim();
                  daytimeobject.endTime = seperate[i].trim().split('<br>')[0].trim().split('</b>' + ' ')[2];
                  if (seperate[i].trim().split('</b>').length == 5){
                        daytimeobject.specialInterest = seperate[i].trim().split('</b>')[4].trim().split(' \n')[0];
                        daytimeobject.meetingType = seperate[i].trim().split('</b>')[3].trim().split('<br>')[0];
                  } else if (seperate[i].trim().split('</b>').length == 4){
                        daytimeobject.meetingType = seperate[i].trim().split('</b>')[3].trim().split(' \n')[0];
                  };
                  daytimes.push(daytimeobject);
            }
            dayTime.push(daytimes);
            console.log(daytimes);
        });
        
We then split the zones evenly and went through and parsed each zone, got the address information from TAMU geoservices, and added all the information into jsons. We then shared them amongst ourselves. I was responsible for zone 1 and zone 4. The full code for these processes can be found in wa07_1.js and wa07_4.js.

### Updating the PostgreSQL Table

Then I had to add all of the zones into my dataset. I decided to change my initial plan of using 3 tables to just using 1. This was primarily because it was easier to add all of the data into just one data table, but also because there ended up being only 1208 entries which is not a very large dataset so it makes sense to house this in only one table. If there were more data entries it would have made more sense to have multiple tables to make the data cleaner, but for this situation one table works fine. I started by created the table in PostregreSQL with all of the rows I wanted (this can be found in wa07a.js). I then added all of the zones' jsons to the table individually (this can be found in wa07b.js). I then checked to make sure all of the rows were in my table (this can be found in wa07c.js). I did this by checking all of the rows in the table by using the query "SELECT * FROM aa_meetings" and checking the count of the rows in the table with the query "SELECT COUNT(*) FROM aa_meetings". This got me back 1208 entries like I wanted, so I knew all of my data was added correctly.
