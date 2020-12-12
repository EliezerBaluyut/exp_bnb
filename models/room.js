const mongoose = require("mongoose")
const path = require("path")
const ImagePath = '/uploads/roomCovers'

const roomSchema = new mongoose.Schema({
    roomTitle: String,
    price: Number,
    roomDesc: String,
    location: String,
    roomImg: String
});

//function to retrieve path of image to display
roomSchema.virtual('roomImagePath').get(function () {
    return path.join('/', ImagePath, this.roomImg)
})


module.exports = mongoose.model('rooms', roomSchema);
module.exports.ImagePath = ImagePath;