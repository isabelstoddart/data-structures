Code for weekly assignment 1 for data structures taken at Parsons School of Design. 

This code reads in provided urls and prints them out into text files. 

For this assignment, I started by following the instruction videos and using the sample code, included below, to take in each url and print them out into a text file:

    var request = require('request');
    var fs = require('fs');

    request('https://parsons.nyc/thesis-2020/', function(error, response, body){
        if (!error && response.statusCode == 200) {
            fs.writeFileSync('/home/ec2-user/environment/data/thesis.txt', body);
        }
        else {console.log("Request failed!")}
    });

I decided I wanted to challenge myself and use a loop to save all of the url files. 

I ran into some trouble here trying to figure out how to print each url file to a separate text file while using a loop. I tried using “/home/ec2-user/environment/AAMeetings/“ + (the number of the url) + “.text” inside a loop to get the files to print to a new text file every time but this didn’t work. They were still printed to the same file every loop iteration and only the last file in the loop showed up. 

I tried making an array of output files to use in the for loop, but I got a throw error. 

I think the issue is that the computer isn't reading in the files fast enough. It seems write file async needs to be used instead of write file sync and await needs to be incorporated somehow. I hope to learn how to do this so I can use a loop in the future.

In the end, I just copied and pasted the sample code 10 times, substituting the correct urls and output files for each. I have also included the for loop I wrote, even though it has errors.

Overall, I thought this assignment was straight forward and the videos were helpful and easy to follow.