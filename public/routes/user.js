const express = require('express')
const router = express.Router();
const db = require('../../database');
const { use } = require('./admin');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
var path = require('path');

function authenticateUser(email, password, fn) {
    var query = `SELECT * FROM USERS WHERE Email='${email}' AND password='${password}'`;

    db.query(query, function(err, user){
        if(err)
            throw err;
        fn(user);
    })
} 

router.get('/', (req, res) => {
    // res.json("Get it bro");

    var query = 'SELECT name, email FROM USERS';
    db.query(query, function(err, users) {
        if(err)
            throw err;
        if(Object.keys(users).length === 0)
            res.status(401).json("USer Not exist");
        else {
            // var query2 = `INSERT INTO USERS VALUES ('${id}','${username}', '${password}', '${email}')`;

            res.json(users)
        }

    })
})

router.get('/login', (req, res) => {
    //render login page
    
    res.sendFile(path.join(__dirname ,'../html/userLoginMine.html'));
})
router.post('/login', (req, res) => {
    //handle login of user

    var email = req.body.Email;
    var password = req.body.password;


    authenticateUser(email, password ,function(user){
        if(Object.keys(user).length) {
            console.log(user);
            res.cookie("userData", user);
            res.status(200).json(user);
        }
        else
            res.status(401).json("user not found");
    });

    //render dashboard
})

router.get('/register', (req, res) => {
    //render registration page
    // console.log("faizan")
    res.sendFile(path.join(__dirname ,'../html/registrationMine.html'));
})

router.post('/register', (req,res) => {
    //handle user registration process
    var id = req.body.ID;
    var username = req.body.Name;
    var password = req.body.password;
    var email = req.body.Email;

    // res.json(req.body);

    var query1 = `SELECT * FROM USERS WHERE Email='${email}' OR Name='${username}'`;

    db.query(query1, function(err, user) {
        if(err)
            throw err;
        if(Object.keys(user).length != 0)
            res.status(401).json("USer Already exist");
        else {
            var query2 = `INSERT INTO USERS VALUES ('${id}','${username}', '${password}', '${email}')`;
    
            db.query(query2, function(err, results) {
                if (err) {
                    res.status(405);
                }
                res.status(200).json("User Registered Successfully");
                // alert user registerd and render login page
            })
        }

    })

    
    
    
    //render login Page
})


router.get('/logout', (req, res)=> {
    //render home page
} )

module.exports = router;