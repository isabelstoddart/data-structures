**Code for weekly assignment 3 for data structures taken at Parsons School of Design**

I started this assignment by following the starter code, included below, and changing certain aspects to get and print out only the aspects I wanted from the API.

    "use strict"

    // dependencies
    const fs = require('fs'),
          querystring = require('querystring'),
          request = require('request'),
          async = require('async'),
          dotenv = require('dotenv');

    // TAMU api key
    dotenv.config();
    const API_KEY = process.env.TAMU_KEY;
    const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'

    // geocode addresses
    let meetingsData = [];
    let addresses = ["63 Fifth Ave", "16 E 16th St", "2 W 13th St"];

    // eachSeries in the async module iterates over an array and operates on each item in the array in series
    async.eachSeries(addresses, function(value, callback) {
        let query = {
            streetAddress: value,
            city: "New York",
            state: "NY",
            apikey: API_KEY,
            format: "json",
            version: "4.01"
        };

        // construct a querystring from the `query` object's values and append it to the api URL
        let apiRequest = API_URL + '?' + querystring.stringify(query);

        request(apiRequest, function(err, resp, body) {
            if (err){ throw err; }

            let tamuGeo = JSON.parse(body);
            console.log(tamuGeo['FeatureMatchingResultType'], apiRequest);
            meetingsData.push(tamuGeo);
        });

        // sleep for a couple seconds before making the next request
        setTimeout(callback, 2000);
    }, function() {
        fs.writeFileSync('data/first.json', JSON.stringify(meetingsData));
        console.log('*** *** *** *** ***');
        console.log(`Number of meetings in this zone: ${meetingsData.length}`);
    });
  
There were two things I needed to change in the starter code. First, I changed the addresses the API read in. I read in my file of addresses from assignment 2 and set addresses equal to this list. Then, I parsed the addresses to put them back in their original array format. Then, I had my array of addresses.

The second thing I changed was the API query. I changed it to only get the information I wanted from the API (address, latitude, longitude) and put them into objects like the format listed below.

    { address: '63 Fifth Ave, New York, NY', latLong: { lat: 40.7353041, lng: -73.99413539999999 } },
    { address: '16 E 16th St, New York, NY', latLong: { lat: 40.736765, lng: -73.9919024 } },
    { address: '2 W 13th St, New York, NY', latLong: { lat: 40.7353297, lng: -73.99447889999999 } }
    
I tried to get my formatting the closest to the example format as possible. To achieve this, I had to create a nested object with the overall address object and an inner latlong object.
I created this object and then had to get the information I wanted from the API to fill the object. Each API request returns an object, so to get the address I went to the InputAddress key in the API request object which was an object itself, so then I went to the StreetAddress key in the InputAddress object and got the actual street address.
To get the latitude and longitude, I went to the OutputGeocodes key in the API request object which was an object itself with another object called OutputGeocode within it. Within the Output geocode object, I found the latitude and longitude key and set latitude and longitude to those values.

And then I had the output format I wanted and created a JSON of these addresses.
