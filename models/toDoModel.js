const mongoose = require('mongoose');
const validator = require('validator');

const toDoSchema = new mongoose.Schema({});

const ToDo = mongoose.model('ToDo', toDoSchema);
module.exports = ToDo;
