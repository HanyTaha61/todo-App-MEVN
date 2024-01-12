// setup express
const express                   = require('express')
const app                       = express()
const cors                      = require('cors')
// connect to database
const {connectToDB, getDB}      = require('./db')

// setup body-parser
require('body-parser');

// use request.body
app.use(express.json())
   
// use CORS
app.use(cors())

// connect to database
let db
connectToDB( err=>{
    if(!err){
        app.listen(5200, ()=>{
            console.log('app is running on port 5200');
        })        
        db = getDB()
    }
})

//setup routes

// (1) GET routes
//----------------
app.get('/', (req,res)=>{
    const all_todos = []
    
    db.collection('todos').find().sort({title: 1})// if sort is needed, use .sort({name: 1})
    .forEach(todo => {all_todos.push(todo)})
    .then(()=>{res.send({all_todos})})    
    .catch((err)=>{console.log(`-----Error----- ${err}`);}) 
})

app.get('/admins', (req,res)=>{
    const all_admins = []
    
    db.collection('admins').find()// if sort is needed, use .sort({name: 1})
    .forEach(user => {all_admins.push(user)})
    .then(()=>{res.send({all_admins})})    
    .catch((err)=>{console.log(`-----Error----- ${err}`);}) 
})

app.get('/books', (req,res)=>{
    const all_books = []
    
    db.collection('books').find().sort({title: 1})
    .forEach(book => {all_books.push(book)})
    .then(()=>{res.send({all_books})})    
    .catch((err)=>{console.log(`-----Error----- ${err}`);}) 
})

// (2) POST routes
//----------------
app.post('/',(req,res)=>{
    const new_todo = req.body
    db.collection('todos')
    .insertOne(new_todo)
    .then(result=>{
        res.status(201).json(result)
    })
    .catch(err=>{
        res.status(500).json({error: err+'00000'})
    })
})

app.post('/users',(req,res)=>{
    const new_admin = req.body
    db.collection('users')
    .insertOne(new_admin)
    .then(result=>{
        res.status(201).json(result)
    })
    .catch(err=>{
        res.status(500).json({error: err+'00000'})
    })
})

app.post('/books',(req,res)=>{
    const new_book = req.body
    db.collection('books')
    .insertOne(new_book)
    .then(result=>{
        res.status(201).json(result)
    })
    .catch(err=>{
        res.status(500).json({error: err+'00000'})
    })
})
