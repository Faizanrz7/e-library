const { json } = require('express');
const express = require('express'); // Importing express module
const app = express(); // Creating an express object
const db = require('./database');
var cookieParser = require('cookie-parser');
const path = require('path')
// const bodyParser = require('body-parser');
const cors = require('cors');

const port = 8000;  // Setting an port for this application

// app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors())

app.use(express.static(__dirname+'/public'));

app.use(cookieParser());

app.use(express.json());

app.get('/', function (req, res) {
    // Home Page
    res.sendFile(path.join(__dirname + '/public/html/indexMine.html'));
})

app.post('/test', function(req, res) {
    console.log("test");
})

app.use('/users', require('./public/routes/user'));
app.use('/admin', require('./public/routes/admin'));
app.use('/books', require('./public/routes/books'));

app.listen(port, function(err) {
    if(err){
        console.log("Error while starting server");
    }
    else{
        console.log("Server has started at "+ port);
    }
})


