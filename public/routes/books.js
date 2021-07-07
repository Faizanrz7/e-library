const express = require('express')
const router = express.Router();
const db = require('../../database');

var table = 'books';

router.get('/getBooks', (req, res) => {
    //get list of books from database
    var query1 = `SELECT * FROM Books`;
    db.query(query1, function(err, books) {
        if(err)
            throw err;
        if(Object.keys(books).length === 0)
            res.status(401).json("Nothing present");
        else {
                console.log(books)
                res.status(200).json(books);
                // alert user registerd and render login page
            // })
        }

    })
    // res.json(books);
})

router.post('/addBook', (req, res) => {
    //add book to the database
    let bookName = req.body.bookname;
    let authorName = req.body.authorname;
    let edition = req.body.edition;

    var query1 = `SELECT * FROM BOOKS WHERE name='${bookName}'`;

    db.query(query1, function(err, book) {
        if(err)
            throw err;
        if(Object.keys(book).length != 0)
            res.status(401).json("Book Already exist");
        else {
            var query2 = `INSERT INTO BOOKS VALUES ('${bookName}','${authorName}', '${edition}')`;
    
            db.query(query2, function(err, results) {
                if (err) {
                    res.status(405);
                }
                res.status(200).json("Book Added Successfully");
                // alert user registerd and render login page
            })
        }

    })
    // console.log(req.body)
    // res.send("Add Book here");
    // res.status(200).json("book added");
})


module.exports = router;