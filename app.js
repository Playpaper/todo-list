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

// require method-override
const methodOverride = require('method-override')

// require routes
const routes = require('./routes')

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

// define related server variables
const port = 3000
// excute express function
const app = express()

app.engine('hbs', exphbs({ 
  defaultLayout: 'main', 
  extname: '.hbs'
}))

app.set('view engine', 'hbs')

// middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

// define route


// Start and listen the server
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})