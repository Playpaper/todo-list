const mongoose = require('mongoose')
const Todo = require('../todo')

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', () => {
  console.log('Mongodb error!')
})

db.once('open', () => {
  console.log('Mongodb connected!')
  for(let i=0; i < 10; i++) {
    Todo.create({name: `name-${i}`})
  }
  console.log('done.')
})