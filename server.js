var express = require('express');
var app = express();
var url = require("url");
var mysql = require('mysql');

app.use(express.static('public'));


app.get('/index.html', function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
  console.log("hi");
  res.end();
})

/* wildcard for standard number */
app.get('/as*', function (req, res) {
  var pathname = url.parse(req.url).pathname;
  console.log("Request for " + pathname + " received.");



  // database deets
  var connection = mysql.createConnection({
    host: 'localhost',
    database: 'nzdt',
    user: 'nzdt_user',
    password: 'smashsmash'
  });



  // connect to the DB
  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + connection.threadId);
  });


  connection.query('SELECT title FROM standard WHERE number=91633', function (err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].title);
  });

  connection.end();
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})