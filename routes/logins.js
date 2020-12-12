const express = require("express"); 
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const session = require('express-session');


router.use(session({
  secret: "123098j123sads", 
  resave: false,
  saveUninitialized: true
}));


router.get('/', (req, res) => {
  if (req.session.user) {
    firstname = req.session.user.fName;
    lastname = req.session.user.lName;
    message = "Admin"
    admin = req.session.user.isAdmin;
    res.render('logins/dashboard', {fName:firstname, lName:lastname, msg: message , admin:admin})
  } else {
    var result = true;
    res.render('logins/index',{ isFound: result })
    console.log("In Log In Page")
    
  }
});

router.post('/', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({ email: email }, function (error, isFound) {
    if (error) {
      console.log(error);
      return res.status(500).send();
    }
    
    if (!isFound) {
      var result = false;
      return res.render('logins/index', { ERROR: 'Email not found', isFound: result});
    }
    
    var firstname = isFound.fName;
    var lastname = isFound.lName;
    var admin = isFound.isAdmin;
    var message = "Admin"

    if (admin) {
      console.log("admin = true")
      req.session.user = isFound;
      console.log("session set")
      return res.render('logins/dashboard', {fName:firstname, lName:lastname, msg: message , admin:admin})
    }
      
    var isMatched;

    isMatched = (bcrypt.compareSync(password, isFound.password))
      console.log(isMatched)
    if (isMatched) {
      //start session for regular user
      console.log("passwords match")
      req.session.user = isFound;
      console.log("session set")
      res.render('logins/dashboard', {fName:firstname, lName:lastname,  admin:admin})
      console.log("Log in successful")
    } else{
      console.log("passwords dont match")
      return res.render('logins/index', { ERROR: 'Incorrect Password', isFound: result});
    }
  })
})

module.exports = router