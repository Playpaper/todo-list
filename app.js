// require express from node_modules
const express = require('express')

// require express-handlebars
const exphbs = require('express-handlebars')

// require body-parser
const bodyParser = require('body-parser')

// require method-override
const methodOverride = require('method-override')

// require routes
const routes = require('./routes')
require('./config/mongoose')

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

// Start and listen the server
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})