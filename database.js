const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'library'
  })
  
  connection.connect(function(err) {
      if (err) {
        throw err;
      }
      console.log("Database Connected");
  } );
//   var que = "INSERT INTO users values (7,'Faizan','Faizan', 'faizananwar344@gmail.com')";
//   connection.query(que, function (err, rows, fields) {
//     if (err) throw err
  
//     console.log('The solution is: ', fields)
//   })
  
//   connection.end()

module.exports = connection;