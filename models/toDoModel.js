const mongoose = require('mongoose');
const validator = require('validator');

const toDoSchema = new mongoose.Schema({
  activity: {
    type: String,
    required: [true, 'Must have activity'],
  },
  list: {
    type: mongoose.Schema.ObjectId,
    ref: 'List',
  },
});

const ToDo = mongoose.model('ToDo', toDoSchema);
module.exports = ToDo;
