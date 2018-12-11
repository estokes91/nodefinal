// const request = require('request');

// var getWeather = (longitude, latitude, callback) => {
//     request({
//         url: 'https://api.darksky.net/forecast/' + '643848a777b81903dd83ab1787eb7708/' + latitude + ',' + longitude,
//         json:true
//     }, (error, response, body) => {
//         if (error) {
//             callback('The given location is invalid.')
//         } else {
//             callback(undefined, {
//                 timezone: body.timezone,
//                 summary: body.currently.summary,
//                 temperature: body.currently.temperature
                

//             });
//         }


//     });
// };

const request = require('request');
// const dotenv = require('dotenv');

// dotenv.load();

var getWeather = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://api.darksky.net/forecast/' + '643848a777b81903dd83ab1787eb7708/' + latitude + ',' + longitude,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Cannot connect to Darksky API');
            } else if (body.code == 400) {
                reject('The given location is invalid.');
            } else {
                resolve({
                    timezone: body.timezone,
                    summary: body.currently.summary,
                    temperature: body.currently.temperature
                });
            }
        });
    });
};

module.exports = {
    getWeather
}

module.exports = {
    getWeather
};
