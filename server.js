const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/School')
.then(()=>console.log('Connected Database'))
.catch(()=>console.log('Error'))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})

const Course = mongoose.model('Courses', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'Mosh',
        author: 'ggg',
        tags: ['ddd', 'eee'],
        isPublished: true
    })
    const result = await  course.save();
    console.log(result);
}

createCourse();

async function getCourse(){
    // eq(equal)
    // ne (not equal)
    // gt (greater than or equal to)
    // lt (less than)
    // lte (less than or eual to)
    // in 
    // nin (not in)

    // or
    // and

    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course.find({name: /^Mosh/,isPublished: true})
    // .find({author: 'Mosh',isPublished: true})
    // .find({price: {$gt: 10, $lte: 20}})
    // .find({price: {$in: [10,15,20]}})
    // .find({name: /^Mosh/,isPublished: true})
    // .find({author: /.*Mosh.*/i,isPublished: true})
    // .find({author: /Hamidani$/i,isPublished: true})
    // .or([{author: 'Mosh'}, {isPublished: true}])
    // .and([{author: 'Mosh'}, {isPublished: true}])
    // .limit(10) 
    // .sort({name: 1})
    // .select({name: 1,tags: 1})
    // .skip((pageNumber-1)*pageSize)
    .count()
    console.log(courses);
}

getCourse();


const Joi = require('joi');
const express = require('express');
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`App: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(function(req, res, next) {
    console.log('Login....')
    next();
});

app.use(function(req, res, next) { 
    console.log('Authenticate....')
    next();
});

const courses = [
    {id: 1, name: 'courses1'},
    {id: 2, name: 'courses2'},
    {id: 3, name: 'courses3'},
    {id: 4, name: 'courses4'},
    {id: 5, name: 'courses5'}
]

app.get('/', (req,res)=>{
    res.send('hello world')
})

app.get('/api/courses', (req,res)=>{
    res.send(courses)
})

app.get('/api/courses/:id', (req,res)=>{
    const course = courses.find(c=>c.id ===  parseInt(req.params.id,10))
    if(!course) res.status(404).send('The course not found')
    res.send(course)
})

app.get('/api/courses/:id/:data', (req,res)=>{
    res.send(req.query) //?sortBy=name
})

app.post('/api/courses', (req,res)=>{
    // if(!req.body.name || req.body.name.length < 3){
    //     // 400 bad request 
    //     res.status(400).send('Name requries or at least 3 char')
    // }
    const schema = {
        name: Joi.string().min(3).required()
    }
    const result  = Joi.validate(req.body, schema);
    if(result.error){
        res.status(400).send(res.error)
    }
    const course ={
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
}) 

app.put('/api/courses/:id', (req,res)=>{
    const course = courses.find(c=>c.id ===  parseInt(req.params.id,10))
    if(!course) res.status(404).send('The course not found')
    const schema = {
        name: Joi.string().min(3).required()
    }
    const result  = Joi.validate(req.body, schema);
    if(result.error){
        res.status(400).send(res.error)
    }
    course.name = req.body.name
    res.send(course)
})

app.delete('/api/courses/:id', (req,res)=>{
    const course = courses.find(c=>c.id ===  parseInt(req.params.id,10))
    if(!course) res.status(404).send('The course not found')

    const index = courses.indexOf(course);
    courses.splice(index,1)
    console.log(course)
    res.send(course)
})

const port = process.env.PORT || 4000
app.listen(port  ,()=>console.log(`Listening port ${port}...`))