"use strict";

// dependencies
const fs = require('fs'),
      querystring = require('querystring'),
      request = require('request'),
      async = require('async'),
      dotenv = require('dotenv');
      dotenv.config({path: '/home/ec2-user/environment/data-structures/.env'});

// TAMU api key
dotenv.config();
const API_KEY = process.env.TAMU_KEY;
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'

// geocode addresses
let meetingsData = [];
let addresses = fs.readFileSync('../wa02/AAMeetingsAddresses.JSON');
//puts JSON file back in its original array format
addresses = JSON.parse(addresses)

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

    //construct a querystring from the `query` object's values and append it to the api URL
    let apiRequest = API_URL + '?' + querystring.stringify(query);
    console.log(apiRequest);

    request(apiRequest, function(err, resp, body) {
        if (err){ throw err; }

        let tamuGeo = JSON.parse(body);
        console.log(tamuGeo['FeatureMatchingResultType'], apiRequest);
        
        let address = {
            "address": '',
            "latlong": {
                "lat" : '',
                "lng" : ''
            }
        }
        
        address.address = tamuGeo['InputAddress']['StreetAddress'];
        address.latlong.lat = tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude'];
        address.latlong.lng = tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Longitude'];
    
        meetingsData.push(address);
    });

    //sleep for a couple seconds before making the next request
    setTimeout(callback, 2000);
}, function() {
    fs.writeFileSync('../wa03/AAaddressesObj.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log(`Number of meetings in this zone: ${meetingsData.length}`);
});
