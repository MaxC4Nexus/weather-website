const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibWF4a2FuZXYiLCJhIjoiY2txcnpwM2Z6MWt2bjJ1c3R1bHc2ZTk5aiJ9.o9ijZh2q35uOoZwxzySMWA";

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, {
                lat: body.features[0].geometry.coordinates[1],
                long: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;