const express = require("express"); 
const path = require("path");
const multer = require('multer')
const router = express.Router();
const Room = require('../models/room');
const uploadPath = path.join("public", Room.ImagePath);
const session = require('express-session');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
var upload = multer({
    dest: uploadPath
})

router.use(session({
  secret: "123098j123sads",
  resave: false,
  saveUninitialized: true
}));

//all rooms route
router.get('/', async (req, res) => {
    try {
        //console.log(req.query.city);
        if (req.query.city) {
            var city = req.query.city;
            const rooms = await Room.find({ location: city })
            res.render('rooms/index', {
                rooms: rooms, msg:city
            })
        } else {
            const rooms = await Room.find({})
            res.render('rooms/index', {
                rooms: rooms, msg: "All Rooms"
            })
        }
        console.log("good")
    } catch {
        console.log("error")
        res.redirect('/')
    }
})

router.get('/rooms', async (req, res) => {
    try {
      console.log("In Search")
      res.send("Working link")
    } catch {
       
    }
})


//new room route, used for displaying the form
router.get('/new', async (req, res) => {
    try {
        const room = new Room()
        res.render('rooms/new', {
            room: room
        })
    } catch {
        res.redirect('/rooms')
    }
})
  
//create room route
router.post('/', upload.single('roomImg'), async (req, res) => {
    const fileName = req.file.filename;
    console.log(req.body.roomTitle)
    console.log(req.body.price)
    console.log(req.body.roomTitle)
    console.log(req.body.location)

    console.log(fileName)
    const room = new Room({
        roomTitle: req.body.roomTitle,
        price: req.body.price,
        roomDesc: req.body.roomTitle,
        location: req.body.location,
        roomImg: fileName
    })
    try {
        const newRoom = await room.save()
        console.log("good")
        res.redirect(`rooms`)
    } catch {
        console.log(error)
        res.redirect('/rooms')
    }
})

router.get('/:id', async (req, res) => {
    try {
        if (!req.session.user) {
            console.log("not logged in")
            console.log(req.params.id)
            const room = await Room.findById(req.params.id)
            res.render('rooms/showRoom', { room: room, isLoggedIn: false, msg:'Please Log In To Book Room' })
        } else {
            console.log("logged in")
            console.log(req.params.id)
            const room = await Room.findById(req.params.id)
            res.render('rooms/showRoom', { room: room, isLoggedIn: true, msg:'You are logged In, Book Room?' })
        }
    } catch(error) {
        console.log(error)
        res.redirect('/')
    }  
})

module.exports = router