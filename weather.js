const request = require('request');

var getWeather = (longitude, latitude, callback) => {
    request({
        url: 'https://api.darksky.net/forecast/' + '643848a777b81903dd83ab1787eb7708/' + latitude + ',' + longitude,
        json:true
    }, (error, response, body) => {
        if (error) {
            callback('The given location is invalid.')
        } else {
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature


            });
        }


    });
};

module.exports = {
    getWeather
};
