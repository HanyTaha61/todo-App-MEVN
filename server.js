// setup express
const express                   = require('express')
const app                       = express()
const cors                      = require('cors')

const {ObjectId}                  = require('mongodb')

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
    
    db.collection('todos').find()// if sort is needed, use .sort({name: 1})
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
    
    db.collection('books').find()
    .forEach(book => {all_books.push(book)})
    .then(()=>{res.send({all_books})})    
    .catch((err)=>{console.log(`-----Error----- ${err}`);}) 
})

app.get('/books/:id', (req,res)=>{
    db.collection('books')
    .findOne({_id: new ObjectId(req.params.id)})
    .then(doc=>{res.status(200).json(doc)})
    .catch(err=>{res.status(500).json({error: 'error: '+err})})
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

app.post('/admins',(req,res)=>{
    const new_admin = req.body
    db.collection('admins')
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

// (3) DELETE routes
//------------------

app.delete('/books/:id', (req, res)=>{
    // if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .deleteOne({_id: new ObjectId(req.params.id)})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({error: err + 'could not delete the doc'})
        })
    // }else{
    //     res.status(500).json('not a valid doc id')
    // }
})