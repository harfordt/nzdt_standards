var mysql = require('mysql');

var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');





exports.allStandards = function (res) {
  var connection = mysql.createConnection({
    host: 'localhost',
    database: 'nzdt',
    user: 'nzdt_user',
    password: 'smashsmash',
    stringifyObjects: 'true'
  });

  // connect to the DB
  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + connection.threadId);
  });

  connection.query('SELECT number,title,level,credits,subject_reference_number FROM standard ORDER BY number ASC;', function (err, rows, fields) {
    if (err) throw err;
    //console.log(rows);
    console.log('###got standard details for home page###');
    res.render('index', {
      //    title: "NZC Technology Achievement Standard Info",
      //standards: standardEngine.standardHeaderInfo()
      //standards: standardEngine.aStandard()
      standards: rows
    });
    //return rows[0];
  });

  connection.end();
}






exports.aStandard = function (std_num, res) {
    var url = "",
      clarify = "";
    console.log("### aStandard ###\nStandard number: " + std_num);
    var connection = mysql.createConnection({
      host: 'localhost',
      database: 'nzdt',
      user: 'nzdt_user',
      password: 'smashsmash',
      stringifyObjects: 'true'
    });

    // connect to the DB
    connection.connect(function (err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
      console.log('connected as id ' + connection.threadId);
    });


    connection.query('SELECT * FROM standard WHERE number=' + std_num, function (err, rows, fields) {
      if (err) throw err;
      console.log(rows);
      //console.log('###got standard details for home page###');

      if (rows[0].level == 1) {
        console.log("LEVEL 1");
        url = 'http://www.nzqa.govt.nz/qualifications-standards/qualifications/ncea/subjects/computing-digital-technologies/clarifications/level-1/as' + rows[0].number + '/';
      }
      console.log("URL: " + url);
      request(url, function (error, response, html) {
        // First we'll check to make sure no errors occurred when making the request
        if (!error) {
          // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
          console.log("NO ERROR FROM REQUEST");

          var $page = cheerio.load(html);
          $page("#bookContent").remove("#prevNext");
          clarify = $page("#bookContent").html();
          console.log("########");
          console.log(clarify);
          console.log("########");
          clarify = _.unescape(clarify);
          //var clarification = $(this).html();


          console.log("FILTER");
          // Let's store the data we filter into a variable so we can easily see what's going on.


          console.log(clarify);
          res.render('as', {
            details: rows[0],
            layout: 'layouts/layout',
            clarification: clarify
          });
        }
      })


      //return rows[0];
    });

    connection.end();
  }
  /*
  exports.getBlogEntries = function() {
      return entries;
  }
   
  exports.getBlogEntry = function(id) {
      for(var i=0; i < entries.length; i++) {
          if(entries[i].id == id) return entries[i];
      }
  }
  */