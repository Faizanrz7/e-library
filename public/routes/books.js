const express = require('express')
const router = express.Router();
const db = require('../../database');
const path = require('path');

var table = 'books';

router.route('/bookList').get(function(req, res) { 
    console.log(path.join(__dirname, '../public/html/booklist.html'));
    return res.sendFile(path.join(__dirname, '../html/booklist.html')); 
});

router.get('/getBooks', (req, res) => {
    var query1 = `SELECT * FROM Books`;
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

router.get('/addBook', (req, res) => {
    return res.sendFile(path.join(__dirname, '../html/addBookMine.html')); 

})

router.get('/requestedBooks', (req, res) => {
    return res.sendFile(path.join(__dirname, '../html/requestedBooks.html')); 

})

router.get('/getRequestedBooks', (req, res) => {
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

router.get('/requestBook', (req, res) => {
    return res.sendFile(path.join(__dirname, '../html/requestMine.html')); 

})

router.post('/requestBook', (req, res) => {
    let bookName = req.body.bookname;
    let authorName = req.body.authorname;
    let category = req.body.category;

    var query2 = `INSERT INTO REQUESTED VALUES ('${bookName}','${authorName}','${category}')`;
    
    db.query(query2, function(err, book) {
        if (err) {
            res.status(405);
        }
        res.status(201).json(book);
    })
})


router.post('/addBook', (req, res) => {
    let bookName = req.body.bookname;
    let authorName = req.body.authorname;
    let category = req.body.category;
    let link = req.body.link;

    var query1 = `SELECT * FROM BOOKS WHERE name='${bookName}'`;

    db.query(query1, function(err, book) {
        if(err)
            throw err;
        if(Object.keys(book).length != 0){
            res.status(505).send({
                error: "Book Already exist",
            });
        }
        else {
            var query2 = `INSERT INTO BOOKS VALUES ('${bookName}','${authorName}','${category}', '${link}')`;
    
            db.query(query2, function(err, book) {
                if (err) {
                    res.status(405);
                }
                res.status(201).json(book);
            })
        }

    })
})


module.exports = router;