const mongoose = require("mongoose");

const userSchema = {
    email: {
        type: String,
        unqiue: true
    },
    fName: String,
    lName: String,
    password: String,
    isAdmin: Boolean
};

module.exports = mongoose.model('users', userSchema);