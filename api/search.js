const express = require('express');
const router = express.Router();
const HotelList = require('../model/hotelList');

router.post('/', async (req, res) =>{
    // const pageNumber = 2;
    // const pageSize = 10;
    const list = await HotelList.find({title: new RegExp('.*' + req.body.search + '.*', 'i')}).limit(10)
    res.send(list)
});


module.exports = router
