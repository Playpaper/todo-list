// require express from node_modules and define related server variables
const express = require('express')
const app = express()
const port = 3000 

// define route
app.get('/', (req, res) => {
  res.send('Hello World !')
})

// Start and listen the server
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})