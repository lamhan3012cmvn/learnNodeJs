const mongoose = require('mongoose') // import mongoose
const Schema = mongoose.Schema // get schema

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
//Tao model xuong db
const Todo = mongoose.model('Todo', TodoSchema)
module.exports = Todo