var mysql = require('mysql');

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
    console.log(rows);
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
      var std = rows[0];
      res.render('as', {
        details: rows[0]
      });
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