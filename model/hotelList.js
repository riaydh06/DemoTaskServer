  
const mongoose = require('mongoose');

const hotelListSchema = new mongoose.Schema({
    image:  String,
    rating: String,
    title: String,
    description: String,
    price: String,
    type: String,
    comments: String,
    avatar: String,
    user: String,
    country: String
})

module.exports = mongoose.model('list', hotelListSchema);