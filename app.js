// require express from node_modules
const express = require('express')

// require mongoose
const mongoose = require('mongoose')

// require express-handlebars
const exphbs = require('express-handlebars')

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


// define related server variables
const port = 3000 

// define route
app.get('/', (req, res) => {
  res.send('Hello World !')
})

// Start and listen the server
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})