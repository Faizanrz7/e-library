const express = require('express')
const router = express.Router();
const db = require('../../database');
const path = require('path');
const { Console } = require('console');



function authenticateAdmin(username, password, fn) {
    var query = `SELECT * FROM ADMIN WHERE username='${username}' AND password='${password}'`;

    db.query(query, function(err, user){
        if(err)
            throw err;
        fn(user);
    })
} 

function changePassword(oldPass, newPass, fn) {
    let query = `UPDATE ADMIN SET password='${newPass}' WHERE password='${oldPass}'`;
    db.query(query, function(err, user){
        if(err)
            throw err;
        fn(user);
    })

}
router.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;


    authenticateAdmin(username, password ,function(user){
        if(Object.keys(user).length != 0) {
            res.status(200).json(user);
        }
        else
            res.status(401).json("Admin not found");
    });
    return res;
})

router.get('/changePassword', (req, res) => {
    return res.sendFile(path.join(__dirname, '../html/passchangeMine.html')); 

})
router.post('/changePass', (req, res) => {
    changePassword(req.body.oldPass, req.body.newPass, function(user) {
        if(user.changedRows == 1){
            console.log(user.changedRows);
            return res.status(201).json(user);
        }
        else {
            console.log(user.changedRows);
            return res.status(404).json(user.changedRows);
        }
    })
})
router.get('/feedbacks', (req, res) => {
    return res.sendFile(path.join(__dirname, '../html/feedbackslist.html')); 

})

router.get('/getFeedbacks', (req, res) => {
    var query1 = `SELECT * FROM FEEDBACKS`;
    db.query(query1, function(err, feedbacks) {
        if(err)
            throw err;
        if(Object.keys(feedbacks).length === 0)
            res.status(401).json("Nothing present");
        else {
                res.status(200).json(feedbacks);
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
                res.status(200).json(books);
        }

    })
})

module.exports = router;