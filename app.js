
/**
 * Module dependencies.
 */

var http = require('http')
  , express = require('express');

var app = express();

var config = require('./config');


// all environments
app.set('port', config.port);
app.set('config', config);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

// var payments = require('./lib/payments')
var pictures = require('./lib/pictures')
  , users = require('./lib/users');

app.use(users);
app.use(pictures);
app.use(payments);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/health', function (req, res) {
  res.send(200,"We good.");
});

app.all('*', function (req, res) {
  res.json(500, {message: "Please use a valid endpoint. Thank you :)"});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});