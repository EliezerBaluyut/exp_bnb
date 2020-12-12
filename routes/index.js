const express = require("express"); 
const router = express.Router();

router.get('/', (req, res) => {
console.log("in index")
res.render('index')
});

module.exports = router