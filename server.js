const Joi = require('joi');
const express = require('express');
const app = express()
app.use(express.json())

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