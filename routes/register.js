const express = require("express"); 
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../models/user');

//all users
router.get('/', (req, res) => {
res.render('users/index')
});

var ErrorMsg = 'Email Already Exists'

//new user route, used for displaying the form
router.get('/new',  (req, res) => {
  res.render('users/new', { user: new User(), ERROR: ErrorMsg, condition: false })
})
  
//create user route
router.post('/', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let newUser = new User({
      email: req.body.email,
      fName: req.body.fName,
      lName: req.body.lName,
      password: hashedPassword
    });
    newUser.save(function (err) {
      if (err) {
         // Duplicate username
        var errorMsg = "Email already exists" 
          if (err.code === 11000) {
            console.log("user already exists")
            return res.render('users/new', { ERROR: 'Email already exists', condition: true })
          }
      }
      console.log("good")
      res.render('logins/index', {isFound: true })
    });
  } catch {
    console.log("error")
    res.redirect('users/new')
  }
})


module.exports = router