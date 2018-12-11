const express = require('express');
const hbs = require('hbs');

var bodyParser = require('body-parser');

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const port = process.env.PORT || 8080;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
	response.render('mainpage.hbs', {
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
