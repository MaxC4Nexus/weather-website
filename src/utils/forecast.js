const request = require('request');

const forecast = (long, lat, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=908c2a2a025198ee8d40bbbd0fa9ee5f&query=" + lat + "," + long;

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback("Unable to connect to weather service!", undefined);
        }  else if(body.error) {
            callback("Unable to find location! Check coordinates and try again!", undefined);
        } else {
            callback(undefined, "It is currently " + body.current.temperature + "C degrees out there. There is " + body.current.precip + "% chance of raining.");
        }
    });
};

module.exports = forecast;