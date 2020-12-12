const HTTP_PORT = process.env.PORT || 8080;
const express = require("express"); 
const expressLayouts = require('express-ejs-layouts')
const app = express();
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/register')
const roomRouter = require('./routes/rooms')
const loginRouter = require('./routes/logins')

//view engine set up
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
//set up a default layout so you dont need to re-do headers and footers etc
app.set('layout', 'layouts/layout');
app.use(bodyParser.urlencoded({extended: false}))
app.use(expressLayouts);
app.use(express.static('public'));


//mongodb connection set up
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/ExpressBnB", {useNewUrlParser :true, useUnifiedTopology : true}, (error) =>{
    if (!error) {
        console.log("Success, Connected to MongoDB")
    } else {
        console.log("Error, cannot connect to database");
    }
});

//routes
app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/rooms', roomRouter)
app.use('/logins', loginRouter)


function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.listen(HTTP_PORT, onHttpStart);