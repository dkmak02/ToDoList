const mongoose = require('mongoose');
const validator = require('validator');

const toDoSchema = new mongoose.Schema({
  activity: {
    type: String,
    required: [true, 'Must have activity'],
  },
});

const ToDo = mongoose.model('ToDo', toDoSchema);
module.exports = ToDo;
