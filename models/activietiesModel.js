const mongoose = require('mongoose');
//const validator = require('validator');

const activitySchema = new mongoose.Schema({
  activity: {
    type: String,
    required: [true, 'Must have activity'],
  },
  list: {
    type: mongoose.Schema.ObjectId,
    ref: 'List',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const ToDo = mongoose.model('ToDo', activitySchema);
module.exports = ToDo;
