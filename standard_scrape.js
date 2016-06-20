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

  //direct link to pdf, may not be correct version
  var url_standard = "http://www.nzqa.govt.nz/nqfdocs/ncea-resource/achievements/2015/as" + std_num+".pdf";
  
  //for scraping the most recent pdf
  var standard_page = "http://www.nzqa.govt.nz/ncea/assessment/view-detailed.do?standardNumber="+std_num;
  
  var url_clarification = 'http://www.nzqa.govt.nz/qualifications-standards/qualifications/ncea/subjects/computing-digital-technologies/clarifications/level-1/as' + std_num + '/';

  console.log("URL of standard: " + url_standard);
  console.log("URL of clarification: " + url_clarification);

  /** standard **/
  /* cheerio library gives jquery functionality */
  request(url_standard, function (error, response, html) {
    if (!error) {
      console.log("NO ERROR FROM REQUEST");
      var $page = cheerio.load(html);
      $page(".tableData");
    }
  })

  /** clarification **/
  request(url_clarification, function (error, response, html) {
    if (!error) {
      console.log("NO ERROR FROM REQUEST");
      var $page = cheerio.load(html);
      $page("#bookContent").remove("#prevNext");
      clarify = $page("#bookContent").html();
     
      

    }

  })
 console.log("########");
      console.log(clarify);
      console.log("########");
  res.render('as2', {
    layout: 'layouts/layout',
    standard: url_standard,
    clarification: clarify
  });

}; //function


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