const express = require('express')
const router = express.Router();
const db = require('../../database');
const path = require('path');

var table = 'books';

// router.use(express.static(__dirname+'/public'));


router.route('/bookList').get(function(req, res) { 
    console.log(path.join(__dirname, '../public/html/booklist.html'));
    return res.sendFile(path.join(__dirname, '../html/booklist.html')); 
});

router.get('/getBooks', (req, res) => {
    //get list of books from database
    var query1 = `SELECT * FROM Books`;
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
    // res.json(books);
})

router.get('/addBook', (req, res) => {
    // res.sendFile()
    return res.sendFile(path.join(__dirname, '../html/addBookMine.html')); 

})
router.get('/issuedBookAdmin', (req, res) => {
    // res.sendFile()
    return res.sendFile(path.join(__dirname, '../html/issuedBookAdmin.html')); 

})
router.get('/requestedBooks', (req, res) => {
    // res.sendFile()
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
                // console.log(books)
                res.status(200).json(books);
                // alert user registerd and render login page
            // })
        }

    })
    // res.json(books);
})

router.get('/requestBook', (req, res) => {
    // res.sendFile()
    return res.sendFile(path.join(__dirname, '../html/requestMine.html')); 

})

router.post('/requestBook', (req, res) => {
    let bookName = req.body.bookname;
    let authorName = req.body.authorname;
    let category = req.body.category;

    // console.log(req.body);

    var query2 = `INSERT INTO REQUESTED VALUES ('${bookName}','${authorName}','${category}')`;
    
    db.query(query2, function(err, book) {
        if (err) {
            res.status(405);
        }
        // console.log(path.join(__dirname , '../html/UserLoginMine.html'));
        // return res.sendFile(path.join(__dirname, '../html/UserLoginMine.html')); 
        res.status(201).json(book);
        // res.status(200).sendFile(path.join(__dirname, '../html/addBookMine.html'));
        

        // alert user registerd and render login page
    })
})


router.post('/addBook', (req, res) => {
    //add book to the database
    // console.log("Book received");
    // console.log(req.body);
    let bookName = req.body.bookname;
    let authorName = req.body.authorname;
    let category = req.body.category;
    let link = req.body.link;
    // console.log(bookName);
    // console.log(authorName);

    var query1 = `SELECT * FROM BOOKS WHERE name='${bookName}'`;

    db.query(query1, function(err, book) {
        if(err)
            throw err;
        if(Object.keys(book).length != 0){
            // windows.alert("Book alread exist")
            res.status(505).send({
                error: "Book Already exist",
            });
            // res.status(205).sendFile(path.join(__dirname, '../html/addBookMine.html'));

        }
        else {
            var query2 = `INSERT INTO BOOKS VALUES ('${bookName}','${authorName}','${category}', '${link}')`;
    
            db.query(query2, function(err, book) {
                if (err) {
                    res.status(405);
                }
                // console.log(path.join(__dirname , '../html/UserLoginMine.html'));
                // return res.sendFile(path.join(__dirname, '../html/UserLoginMine.html')); 
                res.status(201).json(book);
                // res.status(200).sendFile(path.join(__dirname, '../html/addBookMine.html'));
                

                // alert user registerd and render login page
            })
        }

    })
    // console.log(req.body)
    // res.send("Add Book here");
    // res.status(200).json("book added");
})


module.exports = router;