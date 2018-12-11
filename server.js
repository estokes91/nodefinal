const express = require('express');
const hbs = require('hbs');

var bodyParser = require('body-parser');

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const geocode = require('./weather')
const mainpage = require('./views/mainpage.hbs')

const port = process.env.PORT || 8080;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
	response.render('mainpage.hbs', {
	});
});

// app.get('/weather/:longitude/:latitude', (request, response) => {
// 	geocode.getWeather(request.params.longitude, request.params.latitude, (errorMessage, results) => {
// 	if (errorMessage) {
// 		response.send(errorMessage);
// 	} else {
// 		response.send(JSON.stringify(results, undefined, 2));
// 	}
// 	});
// });

// app.post('/', urlencodedParser, (request, response) => {
// 	geocode.getWeather(request.body.userLat, request.body.userLong, (errorMessage, results) => {
// 	if (errorMessage) {
// 		response.send(errorMessage);
// 	} else {
// 		response.send(JSON.stringify(results, undefined, 2));
// 	}
// 	});
// });	

app.post('/', urlencodedParser, (request, response) => {
	geocode.getWeather(request.body.userLat, request.body.userLong, (errorMessage, results) => {
	if (errorMessage) {
		response.send(errorMessage);
	} else {
		response.render('mainpage.hbs', {
			timezone: JSON.stringify(results.timezone, undefined, 2),
			summary: JSON.stringify(results.summary, undefined, 2),
			temperature: JSON.stringify(results.temperature, undefined, 2)
		})
	}
	});
});	

app.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply.view('mainpage');
  }
});


app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
