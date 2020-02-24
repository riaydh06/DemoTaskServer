const express = require('express');
const router = express.Router();
const HotelList = require('../model/hotelList');

router.get('/', async (req, res) =>{
    // const pageNumber = 2;
    // const pageSize = 10;
    const list = await HotelList.find().limit(10)
    res.send(list)
});

router.get('/:id', async (req, res) =>{
    const id = req.params.id
    const data = await HotelList.findOne({_id: id})
    res.send(data)
});

router.post('/', async (req, res) =>{
    const hotel = req.body;
    const data = new HotelList(hotel)
    await data.save()
    res.send(hotel)
});


module.exports = router
