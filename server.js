const Joi = require('joi');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const db = require('./config/dbConfig').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
.then(()=>console.log('Connected Database'))
.catch(()=>console.log('Error'))

app.use("/api/hotellist", require('./api/hotelList'));


app.get('/', (req,res)=>{
    res.send('hello world')
})

const port = process.env.PORT || 4000
app.listen(port  ,()=>console.log(`Listening port ${port}...`))