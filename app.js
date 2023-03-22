// require express from node_modules
const express = require('express')

// require mongoose
const mongoose = require('mongoose')

// require express-handlebars
const exphbs = require('express-handlebars')

//require Todo model
const Todo = require('./models/todo')

// require body-parser
const bodyParser = require('body-parser')

// excute express function
const app = express()

// set a connection to database
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
} 

mongoose.connect(process.env.MONGODB_URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})

// get connect status
const db = mongoose.connection

// connect error
db.on('error', () => {
  console.log('mongodb error!')
})

// connected
db.once('open', () => {
  console.log('mongodb connected')
})

app.engine('hbs', exphbs({ 
  defaultLayout: 'main', 
  extname: '.hbs'
}))

app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

// define related server variables
const port = 3000 

// define route
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

app.get('/todo/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({name})
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.error(error))
})

// Start and listen the server
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})