const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  }
  done: {
    type: Boolean
  }
})

modules.exports = mongoose.model('Todo', todoSchema)