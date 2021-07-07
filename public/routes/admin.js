const express = require('express')
const router = express.Router();

router.get('/login', (req, res) => {
    //render login page
    res.send("Admin login Page");
})
router.post('/login', (req, res) => {
    //handle login of user
    //render dashboard
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