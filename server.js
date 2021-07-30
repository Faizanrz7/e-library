const { json } = require('express');
const express = require('express'); // Importing express module
const app = express(); // Creating an express object
const db = require('./database');
var cookieParser = require('cookie-parser');
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 8000;  // Setting an port for this application

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(__dirname+'/public'));
app.use(cookieParser());
app.use(express.json());


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/html/indexMine.html'));
})

app.route('/adminLogin').get(function(req, res) { 
    return res.sendFile(path.join(__dirname, '/public/html/adminLogin.html')); 
});

app.route('/bookList').get(function(req, res) { 
    return res.sendFile(path.join(__dirname, '/public/html/booklist.html')); 
});
app.route('/adminDashboard').get(function(req, res) { 
    return res.sendFile(path.join(__dirname, '/public/html/adminDashMine.html')); 
});

app.get('/feedback', function(req, res) {
    return res.sendFile(path.join(__dirname, '/public/html/giveFeedback.html')); 
})

app.post('/feedback', function(req, res) {
    let username = req.body.username;
    let feedback = req.body.feedback;

    var query2 = `INSERT INTO FEEDBACKS VALUES ('${username}','${feedback}')`;
    
            db.query(query2, function(err, feedback) {
                if (err) {
                    res.status(405);
                }
                res.status(201).json(feedback);
            })
})

app.use('/admin', require('./public/routes/admin'));
app.use('/books', require('./public/routes/books'));

app.listen(port, function(err) {
    if(err){
        console.log("Error while starting server");
    }
    else{
        console.log("Server has started at http://localhost:8000 " );
    }
});


