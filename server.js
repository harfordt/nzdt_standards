var express = require('express');
var app = express();


var hbs = require('hbs');


var standardEngine = require('./standard_info');

var bodyParser = require('body-parser');

////////////////////////
// for openshift
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function () {
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});
/////////////////////////

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(bodyParser.urlencoded({
  extended: false
}));
// configure views path
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
  standardEngine.allStandards(res);
  //  res.render('index', {
  //    //    title: "NZC Technology Achievement Standard Info",
  //    //standards: standardEngine.standardHeaderInfo()
  //    //standards: standardEngine.aStandard()
  //    number: std.number,
  //    title: std.title
  //  });
});

app.get('/about', function (req, res) {
  res.render('about', {
    title: "About Me"
  });
});

app.get('/as/:number', function (req, res) {
  standardEngine.aStandard(req.params.number, res);
});

app.listen(8080);