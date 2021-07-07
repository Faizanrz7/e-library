const express = require('express')
const router = express.Router();
const db = require('../../database');
const path = require('path');



function authenticateAdmin(username, password, fn) {
    var query = `SELECT * FROM ADMIN WHERE username='${username}' AND password='${password}'`;

    db.query(query, function(err, user){
        if(err)
            throw err;
        fn(user);
    })
} 
// router.get('/login', (req, res) => {
//     //render login page
//     res.send("Admin login Page");
// })
router.post('/login', (req, res) => {
    //handle login of user
    // console.log(req.body);

    var username = req.body.username;
    var password = req.body.password;


    authenticateAdmin(username, password ,function(user){
        if(Object.keys(user).length != 0) {
            // console.log(user);
            // res.cookie("userData", user);
            res.status(200).json(user);
        }
        else
            res.status(401).json("Admin not found");
    });
    //render dashboard
    // res.send("pahuncha");
    // return res.sendFile(path.join(__dirname, '../html/passchangeMine.html')); 
    return res;
})

router.get('/changePassword', (req, res) => {
    // res.sendFile()
    return res.sendFile(path.join(__dirname, '../html/passchangeMine.html')); 

})
router.get('/feedbacks', (req, res) => {
    // res.sendFile()
    return res.sendFile(path.join(__dirname, '../html/feedbacks.html')); 

})

router.get('./getFeedbacks', (req, res) => {
    var query1 = `SELECT * FROM FEEDBACKS`;
    db.query(query1, function(err, feedbacks) {
        if(err)
            throw err;
        if(Object.keys(feedbacks).length === 0)
            res.status(401).json("Nothing present");
        else {
                // console.log(books)
                res.status(200).json(feedbacks);
                // alert user registerd and render login page
            // })
        }

    })
})
router.get('./getRequesteBooks', (req, res) => {
    var query1 = `SELECT * FROM REQUESTED`;
    db.query(query1, function(err, books) {
        if(err)
            throw err;
        if(Object.keys(books).length === 0)
            res.status(401).json("Nothing present");
        else {
                // console.log(books)
                res.status(200).json(books);
                // alert user registerd and render login page
            // })
        }

    })
})


// router.get('/register', (req, res) => {
//     //render registration page
//     res.send("Registration Page");
// })

// router.post('/register', (req,res) => {
//     //handle user registration process
//     //render login Page
// })


router.get('/logout', (req, res)=> {
    //render home page
} )

module.exports = router;